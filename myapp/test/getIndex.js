const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')

chai.use(chaiHttp)



describe('node server', () => {
    it('get index html ', (done) => {
        chai.request(server).get('/').end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
})

let token, directID, delDirectorID;

describe('get top 3 movies', () => {

    before((done) => {
        chai.request(server)
            .post('/authentication')
            .send({ username: 'kaan', password: 'kaan' })//SEND for body
            .end((err, res) => {
                token = res.body.token
                //  console.log(token)
                done()
            })
    })
    describe('get top 3 movies', () => {
        it('request to /api/movies/getallMovies/top3', (done) => {
            chai.request(server)
                .get('/api/movies/getallMovies/top3')
                .set('x-access-token', token)//SET for hearders
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
    })
})

describe('/POST new movie', () => {
    it('it should post new movie', (done) => {
        const movie = {
            title: "test",
            category: "test",
            country: "test",
            imbd_score: 0,
            director_id: "5bb29a3be7762732b4c444ad"
        }
        chai.request(server)
            .post('/api/movies/postMovie')
            .set('x-access-token', token)
            .send(movie)
            .end((err, res) => {
                directID = movie.director_id;

                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('title')
                res.body.should.have.property('category')
                res.body.should.have.property('country')
                res.body.should.have.property('imbd_score')
                res.body.should.have.property('director_id')

                done()
            })

    })
})


describe('/get movies by director id ', () => {
    it('get movies by director id ', (done) => {
        console.log(directID)
        chai.request(server)
            .get('/api/director/directorMovies/' + directID)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body[0].movies.should.be.a('array')
                res.body[0]._id.should.have.property('_id').eql(directID)
                done();
            })
    })
})

describe('add diretors', () => {
    it('add director ', (done) => {
        const director = {
            name: 'kaan',
            surname: ' ateşel',
            bio: 'asdfagasdfadsfasdfadfadsfasd'
        }
        chai.request(server)
            .post('/api/director/director')
            .set('x-access-token', token)
            .send(director)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                delDirectorID = res.body._id
                done();
            })
    })
})




describe('delete directors ', () => {
    it('del directors', (done) => {
        chai.request(server)
            .delete('/api/director/'+delDirectorID)
            .set('x-access-token', token)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(200)
                res.body.should.have.property('status').eql(1)
                done();
            })
    })
})  