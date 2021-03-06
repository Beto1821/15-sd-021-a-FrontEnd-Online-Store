import React from 'react';
import Produtos from '../components/Categorias';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../components/Card';
import CartLink from '../components/CartLink';

class Main extends React.Component {
  state = {
    query: '',
    produtos: [],
    categoryId: '',
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(() => ({
      [name]: value,
    }), () => this.clickQueryButton());
  }

  clickQueryButton = async () => {
    const { query, categoryId } = this.state;
    const response = await getProductsFromCategoryAndQuery(categoryId, query);
    this.setState(() => ({ produtos: response.results }));
  }

  render() {
    const { query, produtos } = this.state;
    return (
      <div>
        <div data-testid="home-initial-message">
          <p> Digite algum termo de pesquisa ou escolha uma categoria. </p>
        </div>
        <CartLink
          { ...this.props }
        />
        <Produtos handleChange={ this.handleChange } />
        <input
          data-testid="query-input"
          type="text"
          name="query"
          onChange={ this.handleChange }
          value={ query }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.clickQueryButton }
        >
          Click
        </button>
        { produtos.map((produto, index) => (<Card
          { ...produto }
          key={ index }
          { ...this.props }
        />))}
      </div>
    );
  }
}

export default Main;
