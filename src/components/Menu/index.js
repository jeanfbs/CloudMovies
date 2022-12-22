import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './Menu.css'

const { PUBLIC_URL } = process.env

class Menu extends Component {
  constructor(props) {
    super(props)
    this.authService = props.providers.authService
  }

  logoutHandler = () => {
    this.authService.logout()
  }

  render = () => {
    return (
      <>
        <Navbar
          className="navbar-theme"
          collapseOnSelect
          expand="md"
          variant="primary"
        >
          <Navbar.Brand href="#" onClick={(ev) => ev.preventDefault()}>
            <h4>
              Cloud
              <img
                src={PUBLIC_URL + '/img/logo.png'}
                alt="React"
                width="30"
                className="d-inline-block align-middle"
              />
              Movies
            </h4>
          </Navbar.Brand>
          <Navbar.Toggle className="text-primary" children={<FaBars />} />
          <Navbar.Collapse>
            <Nav>
              <NavDropdown title={<span>Generos</span>}>
                <NavDropdown.Item href="#action/3.1">Ação</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Aventura</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  Clássicos
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Comédia</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  Documentários
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Drama</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  Ficção Científica
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">
                  Filmes de Bang Bang!
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Infantil</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Policial</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Romance</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Suspense</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Terror</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavLink to="#" className="nav-link">
                Mais Populares
              </NavLink>
            </Nav>
            <Nav>
              <NavLink to="#" className="nav-link">
                Especial de Natal
              </NavLink>
            </Nav>
            <Nav>
              <NavLink to="#" className="nav-link">
                Premium
              </NavLink>
            </Nav>
            <Nav className={'ml-auto '}></Nav>
            <Nav>
              <NavLink to="#" className="nav-link ">
                Login
              </NavLink>
            </Nav>
            <Nav>
              <NavLink to="#" className="nav-link font-weight-bold">
                {' '}
                Cadastrar
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

const mapStateToProps = (state) => ({
  providers: state.providers,
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
