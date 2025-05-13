import * as assert from 'assert';
import { Guest, countFam, countGuest, findGuest } from './guest';

describe('guest', function() {

    const jisung : Guest = {name: "jisung", family: false, diet: "", side: true, plusOne: true};
    const patrick : Guest = {name: "patrick", family: true, diet: "", side: true, plusOne: true};
    const kd : Guest = {name: "kd", family: false, diet: "", side: false, plusOne: true};
    const dk : Guest = {name: "dk", family: true, diet: "", side: true, plusOne: false}; 
    const tyreek : Guest = {name: "tyreek", family: true, diet: "", side: false, plusOne: false};
    const damian : Guest = {name: "damian", family: false, diet: "", side: false, plusOne: false}; 
    const steph: Guest = {name: "steph", family: false, diet: "", side: false, plusOne: undefined};
    const ant: Guest = {name: "ant", family: false, diet: "", side: false, plusOne: undefined};
    const giannis: Guest = {name: "giannis", family: true, diet: "", side: true, plusOne: undefined};
    const geno: Guest = {name: "geno", family: true, diet: "", side: true, plusOne: undefined};
    const tyler: Guest = {name: "tyler", family: true, diet: "", side: true, plusOne: undefined};

    it ('findGuest', function () {
        //min 2 successful cases
        const a1: Array<Guest> = [jisung, kd];
        assert.deepStrictEqual(findGuest("kd", a1), kd);
        const a2: Array<Guest> = [damian, giannis];
        assert.deepStrictEqual(findGuest("damian", a2), damian);
        //min 2 undefined cases
        const a3: Array<Guest> = [steph, ant];
        assert.deepStrictEqual(findGuest("damian", a3), undefined);
        const a4: Array<Guest> = [geno, dk];
        assert.deepStrictEqual(findGuest("tyler", a4), undefined);
    })

    it('countFam', function () {
        //min two tests for 0 recursive calls
        const a1: Array<Guest> = [];
        assert.deepStrictEqual(countFam(true, a1, 0), 0);
        assert.deepStrictEqual(countFam(false, a1, 0), 0);
        //one recursive call
            //branch 1
        const a2: Array<Guest> = [patrick];
        assert.deepStrictEqual(countFam(true, a2, 0), 1);
        const a3: Array<Guest> = [dk];
        assert.deepStrictEqual(countFam(true, a3, 0), 1);
            //branch 2
        const a4: Array<Guest> = [patrick];
        assert.deepStrictEqual(countFam(false, a4, 0), 0);
        const a5: Array<Guest> = [kd];
        assert.deepStrictEqual(countFam(false, a5, 0), 0);
        //2+ recursive calls
            //branch 1
        const a6: Array<Guest> = [giannis, patrick];
        assert.deepStrictEqual(countFam(true, a6, 0), 2);
        const a7: Array<Guest> = [tyler, geno];
        assert.deepStrictEqual(countFam(true, a7, 0), 2);
            //branch 2
        const a8: Array<Guest> = [steph, ant];
        assert.deepStrictEqual(countFam(true, a8, 0), 0);
        const a9: Array<Guest> = [damian, kd];
        assert.deepStrictEqual(countFam(false, a9, 0), 0);

    })

    it ('countGuest', function () {
        //min two tests for 0 recursive calls
        const a1 : Array<Guest> = [];
        assert.deepStrictEqual(countGuest(true, a1, {min: 0, max: 0}), [0, 0]);
        assert.deepStrictEqual(countGuest(false, a1, {min: 0, max: 0}), [0, 0]);

        //one recursive call
            //branch 1
        const a2: Array<Guest> = [steph];
        assert.deepStrictEqual(countGuest(false, a2, {min: 0, max: 0}), [1, 2]);
        const a3: Array<Guest> = [giannis];
        assert.deepStrictEqual(countGuest(true, a3, {min: 0, max: 0}), [1, 2]);
            //branch 2
        const a4: Array<Guest> = [jisung];
        assert.deepStrictEqual(countGuest(true, a4, {min: 0, max: 0}), [2, 2]);
        const a5: Array<Guest> = [patrick];
        assert.deepStrictEqual(countGuest(true, a5, {min: 0, max: 0}), [2, 2]);
            //branch 3
        const a6: Array<Guest> = [dk];
        assert.deepStrictEqual(countGuest(true, a6, {min: 0, max: 0}), [1, 1]);
        const a7: Array<Guest> = [damian];
        assert.deepStrictEqual(countGuest(false, a7, {min: 0, max: 0}), [1, 1]);
        //2+ recursive calls
            //branch 1
        const a8: Array<Guest> = [steph, ant];
        assert.deepStrictEqual(countGuest(false, a8, {min: 0, max: 0}), [2, 4]);
        const a9: Array<Guest> = [steph, giannis];
        assert.deepStrictEqual(countGuest(false, a9, {min: 0, max: 0}), [1, 2]);
            //branch 2
        const a10: Array<Guest> = [jisung, patrick];
        assert.deepStrictEqual(countGuest(true, a10, {min: 0, max: 0}), [4, 4]);
        const a11: Array<Guest> = [kd, jisung]
        assert.deepStrictEqual(countGuest(false, a11, {min: 0, max: 0}), [2, 2]);
            //branch 3
        const a12: Array<Guest> = [damian, tyreek];
        assert.deepStrictEqual(countGuest(false, a12, {min: 0, max: 0}), [2, 2]);
        const a13: Array<Guest> = [dk, damian];
        assert.deepStrictEqual(countGuest(false, a13, {min: 0, max: 0}), [1, 1]);
    });
})