import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom/'
import OpenModalButton from '../OpenModalButton';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()


	const handleInputChange = (event) => {
		event.stopPropagation()
		if (event.key == "Enter") history.push(`/categories/search/${event.target.value}`)
	  };

	return (
		<>
		<div className="navigations">
		<div className="edgy">
		<h1 onClick={((e)=> history.push('/'))}>Edgy</h1>
		<div className="s">
		<input type="text" onKeyDown={handleInputChange} placeholder='Search for anything'></input>
		<i id="searchI" class="fa-solid fa-magnifying-glass"></i>
		</div>
		<i onClick={(e) => history.push("/favorites/current/")} class="fa-regular fa-heart"></i>
		{isLoaded ?
				<div className="user">
					<ProfileButton user={sessionUser} />
				</div>
		:
			null
		}
			<i onClick={((e) => history.push("/shopping_cart"))} class="fa-solid fa-cart-shopping"></i>
		</div>

		<div className="navigation">
			<li className='nav'>
				<NavLink exact to="/">Home</NavLink>
				<NavLink exact to="/categories/clothing">Clothing & Shoes</NavLink>
				<NavLink exact to="/categories/home_decor">Home Decor</NavLink>
				<NavLink exact to="/categories/accessories">Jewlery & Accessories</NavLink>
				<NavLink exact to="/categories/computer">Computer & Tech</NavLink>
				<NavLink exact to="/categories/waifu_body_pillows">Waifu Body Pillows</NavLink>
				<NavLink exact to="/categories/books">Manga</NavLink>
				<NavLink exact to="/categories/music">Music & Entertainment</NavLink>
				<NavLink exact to="/categories/figurines">Art & Figurines</NavLink>
			</li>
		</div>
		</div>
		<div className="border"></div>
		</>
	);
}

export default Navigation;
