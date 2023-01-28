var count = 0
result = document.getElementById("result");

var rg = [[0,0,0],[0,0,0],[0,0,0]];
var rh = [[0,0,0],[0,0,0],[0,0,0]];
var rm = [[0,0,0],[0,0,0],[0,0,0]];

function UserClick(x){
    count +=1;
    let button = document.getElementById(x);
    let result = document.getElementById("result");
    
    button.innerHTML = "x";
    button.style.backgroundColor = "lightgreen";
    button.setAttribute("disabled","disabled");

    let tem = parseInt(x[1])-1;
    let rp = parseInt(tem/3);
    let cp = tem%3;

    
    if(count==9){
        result.innerHTML = "GAME OVER - DRAW";
    }

    main_f(rp,cp);

}

function main_f(rp,cp){
    let result = document.getElementById("result");

    rh[rp][cp] = 1;
    rg[rp][cp] = 1;

    if (check_win(1)){
        result.innerHTML="YOU WON!";
        gameover();}
    else{
        mac_move();
    }

}


function row_s(x){
    if(x == 1)
        x=rh;
    if(x == 2)
        x=rg;
    if(x == 0)
        x=rm;
    let r1 = x[0].reduce((a, b) => a + b, 0);
    let r2 = x[1].reduce((a, b) => a + b, 0);
    let r3 = x[2].reduce((a, b) => a + b, 0);
    
    return [r1,r2,r3];
}

function col_s(x){
    if(x == 1)
        x=rh;
    if(x == 2)
        x=rg;
    if(x == 0)
        x=rm;
    let c1 = x[0][0] + x[1][0] + x[2][0];
    let c2 = x[0][1] + x[1][1] + x[2][1];
    let c3 = x[0][2] + x[1][2] + x[2][2];
    
    return [c1,c2,c3];
}
    
function diag_s(x){
    if(x == 1){
        x=rh;
    }
    if(x == 2){
        x=rg;
    }
    if(x == 0){
        x=rm;
    }
    let d1 = x[0][0] + x[1][1] + x[2][2];
    let d2 = x[0][2] + x[1][1] + x[2][0];
    
    return [d1,d2];
}

function check_win(x){
    if((row_s(x).includes(3)) || (col_s(x).includes(3)) || (diag_s(x).includes(3)))
        return true;
    else
        return false;
}

function gameover(){
    // Select all buttons on the page
    var buttons = document.querySelectorAll("button");

    // Loop through each button and set its disabled property to true
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("disabled","disabled");
    }
}

function mac_move(){

    count+=1;
    next_win = check_risk(0);
    
    if(next_win == 0){
        let k =[];
        let x = check_risk(1);
        k = check_move(x);
        var i = k[0];
        var j = k[1];
        if(count==2){
            let f = [[1,1],[2,0],[2,2],[0,1]];
            let g = Math.floor(Math.random() * 3);
            let l = f[g];
            if(check(l[0],l[1])){
                i = l[0];
                j = l[1];
            }
            else{
                g = g+1;
                l = f[g];
                i = l[0];
                j = l[1];
            }
        }

    }
    else{
        let k = win_move(next_win);
        var i = k[0];
        var j = k[1];
    }
    

    let b = ((i*3)+j)+1;
    let x = "b"+b;
    let button = document.getElementById(x);
    button.innerHTML = 'O';
    button.style.backgroundColor = "orange";
    button.setAttribute("disabled","disabled");
    rm[i][j] = 1;
    rg[i][j] = 1;
    
    if(check_win(0)==true){
        let result = document.getElementById("result");
        result.innerHTML="MACHINE WON!";
        gameover();}
}

function check_risk(x){
    let r = row_s(x);
    let c = col_s(x);
    let d = diag_s(x);
    let r2 = row_s(2);
    let c2 = col_s(2);
    let d2 = diag_s(2);

    for(var i=0; i<3; i++){
        if((r[i] == 2) && (r2[i] != 3)){
            return ['r',i];}
        if((c[i] == 2) && (c2[i] != 3)){
            return ['c',i];}
        if(i<=1){
            if((d[i] == 2) && (d2[i] != 3))
                return ['d',i];}
    }
    return 0
}

function check_move(x){
    if(x==0){
        let r= row_s(0);
        let c = col_s(0);
        let d = diag_s(0);
        let max_r = Math.max.apply(Math, r);
        let max_c = Math.max.apply(Math, c);
        let max_d = Math.max.apply(Math, d);
        
        if((max_r > max_c) && (max_r > max_d)){
            y = r.indexOf(max_r);
            for(let i=0; i<3; i++){
                if(check(y,i))
                    return [y,i];
            }
        }
        if((max_c > max_r) && (max_c > max_d)){
            y = c.indexOf(max_c);
            for(let i=0; i<3; i++){
                if(check(i,y))
                    return [i,y];
            }
        }
        else{
            if(d[0]==0){
                for(let i=0; i<3; i++){
                    if(check(i,i))
                        return [i,i];
                }
            }
            else{
                for(let i=0; i<3; i++){
                    if(check(i,2-i)){
                        return [i,2-i];}
                }
            }
        }
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(check(i,j)){
                    return [i,j];
                }
            }
        }
    }
                
    else{
        
        p = x[0];
        v = x[1];
        if(p=='r'){
            for(let i=0; i<3; i++){
                if(check(v,i))
                    return [v,i];
            }
        }
        if(p=='c'){
            for(let i=0; i<3; i++){
                if(check(i,v))
                    return [i,v];
            }
        }
        if(p == 'd'){
            if(v==0){
                for(let i=0; i<3; i++){
                    if(check(i,i))
                        return [i,i];
                }
            }
            else{
                for(let i=0; i<3; i++){
                    if(check(i,2-i))
                        return [i,2-i];
                }
            }
        }
    }
}

function win_move(x){
    p = x[0];
    v = x[1];
    if(p=='r'){
        for(let i=0; i<3; i++){
            if(check(v,i))
                return [v,i];
        }
    }
    if(p=='c'){
        for(let i=0; i<3; i++){
            if(check(i,v))
                return [i,v];
        }
    }
    if(p == 'd'){
        if(v==0){
            for(let i=0; i<3; i++){
                if(check(i,i))
                    return [i,i];
            }
        }
        else{
            for(let i=0; i<3; i++){
                if(check(i,2-i))
                    return [i,2-i];
            }
        }
    }
}

function check(i,j){
    if(rg[i][j]==0)
        return true
    else{
        return false
    }
}