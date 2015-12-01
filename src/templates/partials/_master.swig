<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	{% block headcss %}
	<link rel="stylesheet" href="css/main.css">
	{%- endblock %}

	{% block headjs %}
	<script src="js/main.js"></script>
	{% endblock %}

	<title>{% block title %}{{ titletext }}{% endblock %}</title>
</head>
<body>

<div class="page page-type">

	{% include "_header.swig" %}

	<h1 class="logo">Magnifico</h1>

	<div class="page__main container">
		{% block content %}{% endblock %}
	</div>

	{% include "_footer.swig" %}

</div>

</body>
</html>