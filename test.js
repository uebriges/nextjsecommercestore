const testString =
  '[{"productId":3,"quantity":9},{"productId":5,"quantity":16},{"productId":2,"quantity":4},{"productId":8,"quantity":5},{"productId":4,"quantity":12},{"productId":1,"quantity":21}]';
console.log(JSON.parse(testString));
JSON.parse(testString).map((element) => console.log(element.productId));
