import { Component, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';
import { combineLatest, forkJoin, from, of } from 'rxjs';
import {
  map,
  delay,
  mergeAll,
  mergeMap,
  switchAll,
  switchMap,
  concatMap,
  concatAll,
} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-operators',
  templateUrl: './rxjs-operators.component.html',
  styleUrls: ['./rxjs-operators.component.css'],
})
export class RxjsOperatorsComponent implements OnInit {
  arr = [1, 2, 3, 4];
  obj = {
    name: 'test',
    age: 24,
  };

  cars = [
    {
      brand: 'Porche',
      model: '45',
    },
    { brand: 'Oddi', model: '78' },
  ];
  constructor() {}

  ngOnInit() {}

  fromOperator(data) {
    // ish mai se observable bna
    let ob = from(data);
    console.log('using from operator passing data:', data);
    ob.subscribe((data) => {
      console.log(data);
    });
  }
  ofOperator(data, returnOb = false) {
    // iska observable bna
    console.log('using of operator passing data:', data);

    let ob = of(data);
    ob.subscribe((data) => {
      console.log(data);
    });
  }

  mapOperator(data) {
    console.log('using map operator data:', data);
    let ob = of(data);
    //pipe used to perform sideEffects
    const modifiedObByMap = ob.pipe(
      map((cars) => cars.map((car) => `${car.brand} and ${car.model}`))
    );
    console.log(modifiedObByMap, 'return value after apply map');
    modifiedObByMap.subscribe((data) => console.log(data));
  }

  getPostById = (id) => {
    return `new post with id:${id}`;
  };

  getPostByIdOb = (id, d = 1000) => {
    return of(`new post with id:${id}`).pipe(delay(d));
  };

  mapWithMergeAll() {
    let postIds = from([1, 2, 3]);
    // const ob = postIds.pipe(map((id) => this.getPostByIdOb(id)));

    // [observable1,observable2]; wrap array as an observable return

    // solution  using mergeAll which subscribe innerObservable return By
    // map rxjs opertor
    const ob = postIds.pipe(
      map((id) => this.getPostByIdOb(id)),
      mergeAll()
    );
    // Observable[(data using ob new post with id:1,data using ob new post with id:1,data using ob new post with id:1)]
    ob.subscribe((data) => console.log(`data using ob ${data}`));
  }

  mergeMapOperator() {
    // mergeMap = mergeAll + map;
    let postIds = from([1, 2, 3]);
    const ob = postIds.pipe(mergeMap((id) => this.getPostByIdOb(id)));
    ob.subscribe((data) => console.log(`data using ob ${data}`));
  }

  switchMapOperator() {
    // switchMap = switchAll+map;
    // SwitchAll cancels the previous subscription & subscribe to the new one;
    let postIds = from([1, 2, 3]);
    const ob = postIds.pipe(switchMap((id) => this.getPostByIdOb(id)));
    ob.subscribe((data) =>
      console.log(
        'data using ob by switchMap gives latest subscription and cancel previous subscription',
        data
      )
    );
  }

  concatMapOperator() {
    // concatMap = concatAll + map
    // concatMap not subscribe the next observable untill the current observable not complete
    // Benefit order will maintain

    let postIds = from([1, 2, 3]);
    const ob = postIds.pipe(concatMap((id) => this.getPostByIdOb(id)));
    ob.subscribe((data) =>
      console.log(`data using ob by using concatMap
    it will only subscribe new observable only when current one complete
    so order maintain ${data}
`)
    );
  }

  forkJoin() {
    // when all observable are complete forkJoin emit the last emiited value from each.

    const ob1 = from([1, 2, 3]).pipe(delay(2000));
    const ob2 = from(['a', 'b', 'c']);
    forkJoin([ob1, ob2]).subscribe((res) => {
      console.log('data from the forkjoin', res);
      // data from the forkjoin [3, "c"]
    });
  }

  combineLatest() {
    // when any observables emits a value,combineLatest emits the latest value from each
    const ob1 = from([1, 2, 3]).pipe(delay(2000));
    const ob2 = from(['a', 'b', 'c']);
    combineLatest([ob1, ob2]).subscribe((res) => {
      console.log(res);

      // output [1,"c"]
      // [2,"c"]
      // [3,"c"]
    });
  }
}
