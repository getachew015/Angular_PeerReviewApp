
export class WorkPackage {

    public title: string;
    public description: string;
    public file: File;
    public url: string;
    public progress: number;
    public dateCreated: string ;
    public expectedCompletionDate: string;

    constructor(file: File){
        this.file = file;
    }

}
