module.exports = class {
    constructor() {
        this.P1Score = 0;
        this.P2Score = 0;
        this.started = false;
        this.Lines = 
        {
            "1": [],
            "2": []
        };
        //LineClear
        // [
        //     {
        //         "id": int id
        //         "No_of_Lines": int lines,
        //         "Added": true/false
        //     }
        // ]
        this.P1r = false;
        this.P2r = false;
        this.startTime = null;
        this.P1a = true;
        this.P2a = true;
    }
    addLine(p, num) {
        this.Lines[p].push({"No_of_Lines": num, "Added": false});
        return "OK"
    }
    setPScore(p, score) {
        if (p == 1){
            this.P1Score = score;
            return [this.P1Score];
        } else {
            this.P2Score = score;
            return [this.P2Score];
        }
    }
    getPScore(p) {
        if (p == 1){
            return [this.P1Score]
        } else {
            return [this.P2Score]
        }
    }
    startedTF(TF) {
        this.started = TF;
        return [this.started];
    }
    rdy(p,TF) {
        if (p == 1){
            this.P1r = TF;
        } else {
            this.P2r = TF;
        }
        return true
    }
    checkRdy(){
        if ((this.P1r == true) && (this.P1r == true)) {
            return true
        }
        return false
    }
    checkRdyI(p){
        if (p == 1){
            return this.P1r;
        } else {
            return this.P2r;
        }
    }
    checkLine(p) {
        if (p == 1){ //player checks other player's cleared
            add = 0;
            this.LineClear2.forEach((res)=> {
                if (res["2"]["Added"] == false){
                    add += res["2"]["No_of_Lines"];
                    res["2"]["Added"] = true;
                }
            });
            return add;
        } else { //player checks other player's cleared
            add = 0;
            this.LineClear1.forEach((res)=> {
                if (res["1"]["Added"] == false){
                    add += res["1"]["No_of_Lines"];
                    res["1"]["Added"] = true;
                }
            });
            return add;
        }
    }
    setStart(){
        AddSecs = 10;
        date = new Date(new Date().getTime()+(AddSecs * 1000));
        this.startTime = date;
        return this.startTime
    }
    getStart(){
        return this.startTime
    }
    setDead(p){
        if (p == 1){
            this.P1a = false;
        } else {
            this.P2a = false;
        }
    }
    getDead(){
        return (
            {
                "p1": this.P1a,
                "p2": this.P2a
            }
            )
    }
}