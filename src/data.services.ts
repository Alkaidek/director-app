
export class DataService {
    result: any;

    constructor(private _http: Http) { }
    getSportImg(n) {
        return this._http.get('/api/test1').pipe(result => this.result = result.json().data);
    }
}