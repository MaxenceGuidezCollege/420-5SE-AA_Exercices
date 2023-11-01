const {expect} = require('chai');
const crypto = require('crypto');
const joi = require('joi');

const property = "URL";

const user = {
    id: crypto.randomUUID(),
    firstname: 'Migael',
    lastname: 'Beaudoin',
    "email": "yo",
    [property]: 'https://localhost:3000/users/3'
}

const schema = joi.object(
    {
        id: joi.string().uuid().required(),
        firstname: joi.string().min(2).max(50).required(),
        lastname: joi.string().min(2).max(50).required(),
        email: joi.string().email().required()
    }
)

describe('test unitaire', ()=>{

    it('should fail', ()=>{
        expect.fail('it fails!');
    })

    describe('sous-test 1', ()=>{

        it('should have property name', ()=>{
            const user = {
                name: 'toto',
                firstname: 'titi'
            };

            expect(user).to.have.property('name');
        })
    })

    describe('sous-test 2', ()=>{
        it('should test firstname', ()=>{
            let user = {
                firstname: 'y'
            };

            let result = schema.validate(user)
            expect(result).to.have.property('error');

            user = {}

            result = schema.validate(user)
            expect(result).to.have.property('error');

            // if(result.error){
            //     throw result.error;
            // }
        })

        it('should test email', ()=>{
            let user = {
                firstname: 'y'
            };

            let result = schema.validate(user)
            expect(result).to.have.property('error');

            user = {}

            result = schema.validate(user)
            expect(result).to.have.property('error');

            // if(result.error){
            //     throw result.error;
            // }
        })
    })
})