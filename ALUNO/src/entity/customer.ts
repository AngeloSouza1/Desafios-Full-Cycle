class Customer {
    _id: string;
    _name: string;
    _address: string;

    constructor(id: string, name:string, address: string) {
        this.id = id;
        this.name = name;
        this._address = address;
    }   

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get address(): string{
        return this._address;
    }

    set id(): string{
        return this._id;
    }

    set name(): string{
        return this._name;
    }

    set address(): string{
        return this._address;
    }

}
