import React, { Component } from 'react'
import { Col, Row, Card, CardGroup, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './style.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.movieService = props.providers.movieService
  }

  componentWillMount = async () => {
    this.news = this.movieService.getMovies('novidades')
    this.top = this.movieService.getMovies('top-10')
    this.christmas = this.movieService.getMovies('especial-natal')
  }

  state = {
    news: null,
    top: null,
    christmas: null,
  }

  sortNews = async (value) => {
    this.setState({
      news: this.movieService.getMoviesSortBy('novidades', value),
    })
  }

  sortTop = async (value) => {
    this.setState({
      top: this.movieService.getMoviesSortBy('top-10', value),
    })
  }

  sortChristmas = async (value) => {
    this.setState({
      christmas: this.movieService.getMoviesSortBy('especial-natal', value),
    })
  }

  splitMovies = (movies) => {
    if (!movies) return

    const result = movies.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 10)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])

    return result
  }

  render = () => {
    const { sortBy } = this.state

    return (
      <>
        <Row id="news-row">
          <Col sm={9}>
            <h1 className="text-white">{this.news ? this.news.name : ''}</h1>
          </Col>
          <Col sm={3}>
            <Form>
              <Form.Group as={Row} controlId="sortByGroup">
                <Form.Label
                  column
                  sm="6"
                  className="text-white text-right text-right"
                >
                  Ordernar por
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    as="select"
                    size="sm"
                    name="sortBy"
                    onChange={(event) => this.sortNews(event.target.value)}
                  >
                    <option value="year">Ano de Lançamento</option>
                    <option value="title">Nome</option>
                    <option value="country">País</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div id="news" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {this.news.movies
                  ? this.splitMovies(this.news.movies).map((list, idx) => (
                      <Item key={idx} list={list} index={idx} />
                    ))
                  : ''}
              </div>
            </div>
          </Col>
        </Row>
        <Row id="top-row">
          <Col sm={9}>
            <h1 className="text-white">{this.top ? this.top.name : ''}</h1>
          </Col>
          <Col sm={3}>
            <Form>
              <Form.Group as={Row} controlId="sortByGroup">
                <Form.Label column sm="6" className="text-white text-right">
                  Ordernar por
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    as="select"
                    size="sm"
                    name="sortBy"
                    onChange={(event) => this.sortTop(event.target.value)}
                  >
                    <option value="year">Ano de Lançamento</option>
                    <option value="title">Nome</option>
                    <option value="country">País</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row id="top10-row">
          <Col sm={12}>
            <div id="top" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {this.top.movies
                  ? this.splitMovies(this.top.movies).map((list, idx) => (
                      <Item key={idx} list={list} index={idx} />
                    ))
                  : ''}
              </div>
            </div>
          </Col>
        </Row>
        <Row id="christmas-row">
          <Col sm={9}>
            <h1 className="text-white">
              {this.christmas ? this.christmas.name : ''}
            </h1>
          </Col>
          <Col sm={3}>
            <Form>
              <Form.Group as={Row} controlId="sortByGroup">
                <Form.Label column sm="6" className="text-white text-right">
                  Ordernar por
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    as="select"
                    size="sm"
                    name="sortBy"
                    onChange={(event) => this.sortChristmas(event.target.value)}
                  >
                    <option value="year">Ano de Lançamento</option>
                    <option value="title">Nome</option>
                    <option value="country">País</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row id="especial-natal-row">
          <Col sm={12}>
            <div id="christmas" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {this.christmas.movies
                  ? this.splitMovies(this.christmas.movies).map((list, idx) => (
                      <CardGroup>
                        <Item key={idx} list={list} index={idx} />
                      </CardGroup>
                    ))
                  : ''}
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

const Item = (props) => (
  <div className={`carousel-item ${props.index == 0 ? 'active' : ''}`}>
    {props.list
      ? props.list.map((movie, idx) => <Movie key={idx} movie={movie} />)
      : ''}
  </div>
)

const Movie = (props) => (
  <Card style={{ width: '9.5%' }} className="d-inline-flex mr-2">
    <Card.Img variant="top" src={props.movie.images.thumb} />
    <Card.Body style={{ minHeight: '100px' }}>
      <ul className="list-unstyled">
        <li className="fs-7 font-weight-bold">{props.movie.title}</li>
        <li className="fs-7">
          {props.movie.year} - {props.movie.director}
        </li>
        <li className="fs-7">{props.movie.country}</li>
      </ul>
    </Card.Body>
  </Card>
)

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

const mapStateToProps = (state) => ({
  providers: state.providers,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
