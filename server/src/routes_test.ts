import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { addGuest, listGuests, resetMap } from './routes';


describe('routes', function() {

  it ('addGuests', function() {
    //min two missing name
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {}});
    const res1 = httpMocks.createResponse();
    addGuest(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), "missing 'name' parameter");

    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : true}});
    const res2 = httpMocks.createResponse();
    addGuest(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), "missing 'name' parameter");

    //min two missing family
    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung"}});
    const res3 = httpMocks.createResponse();
    addGuest(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(), "missing 'family' parameter");

    const req4 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: "true"}});
    const res4 = httpMocks.createResponse();
    addGuest(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), "missing 'family' parameter");

    //min two missing diet
    const req5 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true}});
    const res5 = httpMocks.createResponse();
    addGuest(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(), "missing 'diet' parameter");

    const req6 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true, diet: false}});
    const res6 = httpMocks.createResponse();
    addGuest(req6, res6);
    assert.strictEqual(res6._getStatusCode(), 400);
    assert.deepStrictEqual(res6._getData(), "missing 'diet' parameter");

    //min two missing side
    const req7 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true, diet: ""}});
    const res7 = httpMocks.createResponse();
    addGuest(req7, res7);
    assert.strictEqual(res7._getStatusCode(), 400);
    assert.deepStrictEqual(res7._getData(), "missing 'side' parameter");

    const req8 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true, diet: "", side: "james"}});
    const res8 = httpMocks.createResponse();
    addGuest(req8, res8);
    assert.strictEqual(res8._getStatusCode(), 400);
    assert.deepStrictEqual(res8._getData(), "missing 'side' parameter");

    //min two invalid plusOne
    const req9 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true, diet: "", side: true, plusOne: "true"}});
    const res9 = httpMocks.createResponse();
    addGuest(req9, res9);
    assert.strictEqual(res9._getStatusCode(), 400);
    assert.deepStrictEqual(res9._getData(), "missing 'plusOne' parameter");

    const req10 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true, diet: "", side: true, plusOne: "false"}});
    const res10 = httpMocks.createResponse();
    addGuest(req10, res10);
    assert.strictEqual(res10._getStatusCode(), 400);
    assert.deepStrictEqual(res10._getData(), "missing 'plusOne' parameter");

    //min two invalid extraName
    const req11 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true, diet: "", side: true, plusOne: false, extraName: []}});
    const res11 = httpMocks.createResponse();
    addGuest(req11, res11);
    assert.strictEqual(res11._getStatusCode(), 400);
    assert.deepStrictEqual(res11._getData(), "missing 'extraName' parameter");

    const req12 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true, diet: "", side: true, plusOne: false, extraName: true}});
    const res12 = httpMocks.createResponse();
    addGuest(req12, res12);
    assert.strictEqual(res12._getStatusCode(), 400);
    assert.deepStrictEqual(res12._getData(), "missing 'extraName' parameter");

    //min two invalid extraDiet
    const req13 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true, diet: "", side: true, plusOne: false, extraName: "lee", extraDiet: []}});
    const res13 = httpMocks.createResponse();
    addGuest(req13, res13);
    assert.strictEqual(res13._getStatusCode(), 400);
    assert.deepStrictEqual(res13._getData(), "missing 'extraDiet' parameter");

    const req14 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name : "jisung", family: true, diet: "", side: true, plusOne: false, extraName: "lee", extraDiet: true}});
    const res14 = httpMocks.createResponse();
    addGuest(req14, res14);
    assert.strictEqual(res14._getStatusCode(), 400);
    assert.deepStrictEqual(res14._getData(), "missing 'extraDiet' parameter");

    // min two success cases
    const req15 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name: "jisung", family: false, diet: " ", side: true}});
    const res15 = httpMocks.createResponse();
    addGuest(req15, res15);
    assert.strictEqual(res15._getStatusCode(), 200);
    assert.deepStrictEqual(res15._getData().guest.name, "jisung");
    assert.deepStrictEqual(res15._getData().guest.family, false);
    assert.deepStrictEqual(res15._getData().guest.diet, " ");
    assert.deepStrictEqual(res15._getData().guest.side, true);

    const req16 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest', body: {name: "jisung", family: true, diet: " ", side: false, extraName: "lee", extraDiet: " "}});
    const res16 = httpMocks.createResponse();
    addGuest(req16, res16);
    assert.strictEqual(res16._getStatusCode(), 200);
    assert.deepStrictEqual(res16._getData().guest.name, "jisung");
    assert.deepStrictEqual(res16._getData().guest.family, true);
    assert.deepStrictEqual(res16._getData().guest.diet, " ");
    assert.deepStrictEqual(res16._getData().guest.side, false);
    assert.deepStrictEqual(res16._getData().guest.extraName, "lee");
    assert.deepStrictEqual(res16._getData().guest.extraDiet, " ");

    resetMap();
  })

  it ('listGuests', function() {
    // min two cases
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/listGuests', query: {}});
    const res1 = httpMocks.createResponse();
    listGuests(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {guests: []});

    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/addGuest',
         body: {name: "jisung", family: true, diet: "", side: true, plusOne: undefined, 
            extraName: undefined, extraDiet: undefined }});
    const res2 = httpMocks.createResponse();
    addGuest(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData().guest.name, "jisung");
  })

});
