{% extends 'partials/_master.swig' %}

{% set pageId = 1 %}

{% block title %}{% set titletext = "Magnifico" %}{{ titletext }}{%- endblock %}

{% block content %}
	<div class="widget">
		<header class="widget__head">
			<h2 class="widget__title">from the blog</h2>
		</header>
		<div class="widget__body"></div>
	</div>

	<div class="widget widget_gutter">
		<header class="widget__head">
			<h2 class="widget__title">Lorem ipsum dolor.</h2>
		</header>
		<div class="widget__body">
		</div>
	</div>

	<button class="btn">button</button>
	<a class="btn" href="#404">next</a>
	<div class="btn">prev</div>
	<span class="btn">prev</span>
{% endblock content %}