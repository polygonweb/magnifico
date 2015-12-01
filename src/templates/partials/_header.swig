<!-- begin header -->
<header class="page__header">

	<div class="container">

		<div class="cols">
			<nav class="nav col col_xs-8-12">
				{% for item in menu %}
					{% if loop.index == pageId  %}
						<a class="nav__link nav__link_active" href="#404">{{ item }}</a>
					{% else %}
						<a class="nav__link" href="#404">{{ item }}</a>
					{% endif %}
				{% endfor %}
			</nav>

			<form class="search-form col col_xs-4-12">
				<input class="search-form__text" type="text">
				<button class="btn search-form__btn" type="submit">search</button>
			</from>

		</div>

	</div>

</header>
<!-- end header -->