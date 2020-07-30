window.addEventListener('load', () => {
  function getCategories() {
    var root = { id: 'root', parent: null, children: [] };
    var books = { id: 'books', parent: root, children: [] };
    var movies = { id: 'movies', parent: root, children: [] };
    var fantasy = { id: 'fantasy', parent: books, children: [] };
    var tolkien = { id: 'tolkien', parent: fantasy, children: [] };

    root.children = [books, movies];
    books.children = [fantasy];
    fantasy.children = [tolkien];

    return root;
  }

  function getProductsAssignements() {
    return {
      B001: ['movies', 'fantasy'],
      D8: ['tolkien', 'root'],
      RX20: [],
    };
  }

  function getPaths(productid) {
    var root = getCategories();
    var assignments = getProductsAssignements();

    let paths = [];
    let obj = [];
    let countId = 0;

    let categories = (categorie, e) => {
      if (categorie.children.length !== 0) {
        for (var index = 0; index < categorie.children.length; index++) {
          const element = categorie.children[index];
          if (e === element.id) {
            obj.push(element.id);

            var aux = element;
            var path = aux.id;
            var countAux = 0;

            while (aux.parent !== null) {
              aux = aux.parent;
              path = `${aux.id};${path}`;
              countAux += 1;
            }

            if (countAux > countId) {
              paths.push(path);
            }

            countId = countAux;
          }
          categories(element, e);
        }
      }
      return obj;
    };

    for (var value in assignments) {
      if (productid === value) {
        assignments[value].forEach((e) => {
          categories(root, e);
        });
      }
    }

    if (paths.length !== 0) {
      return paths;
    }

    return ['EMPTY'];
  }

  //console.log(getPaths('B001'));
});
