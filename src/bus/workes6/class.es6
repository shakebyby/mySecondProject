define((require,module,exports) => {
    function Point(x,y){
        this.x = x;
        this.y = y;
    }
    Point.prototype.toString=function(){
        return ""+this.x+","+this.y;
    };
    let p = new Point(255,122);
    console.log(p);
    console.log(p.toString());
    class PointEs6 {
        constructor(x,y){
            this.x=x;
            this.y=y;
        }
        toString(){
            return "("+this.x+","+this.y+")";
        }
    }
    let p2 = new PointEs6(122,120);
    console.log(p2);
    console.log(p2.toString());
    console.log(typeof p2);
    console.log(typeof PointEs6);
    console.log(PointEs6 === PointEs6.prototype.constructor);
    // 拓展方法
    Object.assign(PointEs6.prototype,{
        getX(){
            console.log(this.x);
        },
        getY(){
            console.log(this.y);
        }
    });
    p2.getX();
    p2.getY();
    console.log(Object.keys(PointEs6.prototype));
    console.log(Object.getOwnPropertyNames(PointEs6.prototype));
    console.log(Object.keys(Point.prototype));
    console.log(Object.getOwnPropertyNames(Point.prototype));
    // const MyClass = class me{
    //     getClassName(){
    //         return  Me.name
    //     }
    // };
    // let inst = new MyClass();
    // console.log(inst.getClassName());
    let pp2 = new class {
        constructor(name){
            this.name = name;
        }
        sayName(){
            console.log(this.name);
        }
    }('pp2');
    pp2.sayName();
    class logger{
        constructor(){

        }
    }
    // classs中的严格模式
    class points {}
    console.log(points.name);
    class father{
        constructor(eye,nose,face){
            this.eye = eye;
            this.nose = nose;
            this.face = face;
        }
        getPeople(){
           return this.eye+'big,'+this.nose+'small,'+this.face+'beautiful.';
        }
    }
    let sf = new father('blue','steck','white');
    console.log(sf.getPeople());
    class son extends father{
        constructor(eye,nose,face,sex){
            super(eye,nose,face);
            this.sex = sex;
        }
        getPeople(){
            return this.sex + ','+super.getPeople();
        }
    }
    var sfSon = new son('blue','steck','white','man');
    console.log(sfSon.getPeople());
    //关于es6 字符串的扩展
    //关于es6 正则表达式的扩展
    //关于es6 数值的扩展
    console.log(Number.isFinite(15));
    console.log(Number.isFinite(Infinity));
});