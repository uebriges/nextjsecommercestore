const testString =
  '[{"productId":3,"quantity":2},{"productId":5,"quantity":14},{"productId":2,"quantity":2},{"productId":8,"quantity":4}]';
console.log(JSON.parse(testString));
JSON.parse(testString).map((element) => console.log(element.productId));
