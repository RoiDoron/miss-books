const { useNavigate } = ReactRouter
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

	const navigate = useNavigate()

	function onGoHome() {
		navigate('/')
	}

	return <header className="app-header full">
		<h1 onClick={onGoHome}>React Book App</h1>

		<nav className="app-nav">
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/book'>Books</NavLink>
			<NavLink to='/about'>About</NavLink>
		</nav>
	</header>
}