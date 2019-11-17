let nodes = [],
    input, parseBtn, ast, arr;


function setup() {
    let ctx = createCanvas(900, 500);
    ctx.parent('output-container');
    frameRate(1);
    input = select('#input');
    parseBtn = select('#parse');
    parseBtn.mousePressed(reset)
    input.value('1 + 2 * 3');
    noLoop();
}

function reset() {
    nodes = []
    ast = generateAST(lex(input.value()));
    postorderTraverse(ast);
    arr = BFS(ast);
    arr[0].h = 1;
    arr[0].x = width / 2;
    arr[0].y = 60;
    for (let node of arr) {
        node.h = getHeight(ast, node, 1);
        let parent = getParentNode(ast, node);
        if (!parent) continue;
        if (parent.left === node)
            node.x = parent.x - 70;
        else
            node.x = parent.x + 70;
        node.y = node.h * 60;
    }

    for (let node of arr) {
        if(node.y - node.r > height)
            reduceNodeRadii();
        for (let nd of arr) {
            if (node.x === nd.x && node.y === nd.y){
                node.x -= 24;
                nd.x += 24;
            }
        }
    }
    loop();
}

function draw() {
    background('#fff2fe');
    for (let node of nodes) {
        node.show();
    }
    if (arr.length) {
        let node = arr.pop();
        if (node.left && node.right) {
            let value = eval(node);
            node.value = value;
            nodes.splice(nodes.indexOf(node.left), 1);
            nodes.splice(nodes.indexOf(node.right), 1);
            node.left = null;
            node.right = null;

            node.color = '#9213d1';
            if (nodes.length === 1)
                node.color = 'green';
        } else {
            node.color = '#9213d1';
        }
    }
}

function postorderTraverse(node) {
    if (node === null) return;
    postorderTraverse(node.left);
    nodes.push(node)
    postorderTraverse(node.right);
}

function BFS(node) {
    if (node === null) return;
    let arr = [];
    let queue = [];
    queue.push(node);

    while (queue.length) {
        let n = queue.shift();
        arr.push(n);

        if (n.left)
            queue.push(n.left);
        if (n.right)
            queue.push(n.right);
    }
    return arr;
}

function getHeight(tree, node, height) {
    if (tree == undefined) return 0;
    if (tree === node) return height;

    let level = getHeight(tree.left, node, height + 1);
    if (level) return level;

    return getHeight(tree.right, node, height + 1);
}

function getParentNode(node, child) {
    if (node.left === child || node.right === child) return node;
    let parent;
    if (node.left)
        parent = getParentNode(node.left, child);
    if (node.right && !parent)
        parent = getParentNode(node.right, child);

    return parent;
}

function reduceNodeRadii(){
    for(let node of nodes){
        node.r /= 1.2;
    }
}