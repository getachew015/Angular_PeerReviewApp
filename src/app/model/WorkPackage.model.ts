export class WorkPackage {
    public $key: string;
    public url: string;
    public progress: number;
    public dateCreated: Date;
    public title: string;
    public description: string;
    public file: File;

    constructor(file: File){
        this.file = file;
        this.dateCreated = new Date();
    }

}