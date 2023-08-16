export class LevelData {
    static init(){
        this.data = {min: 1, max: 3}
    }

    static nextLevell(score){
        let target = Math.floor(score / 10);
        let data = { min: 1, max: 3};
        data.min += target;
        data.max += target;
        this.data = data;
    }
}