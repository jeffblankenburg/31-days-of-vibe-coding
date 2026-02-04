---
layout: default
title: "Blog"
permalink: /blog/
---

# Blog

All posts about vibe coding and AI-assisted development.

{% assign blog_posts = site.posts | where: "category", "blog" %}
{% assign sorted_blog = blog_posts | sort: 'date' | reverse %}

{% if sorted_blog.size > 0 %}
<ul class="post-list">
{% for post in sorted_blog %}
<li>
<span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
<h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
<p>{{ post.excerpt | strip_html | truncate: 200 }}</p>
</li>
{% endfor %}
</ul>
{% else %}
<p><em>No blog posts yet. Check back soon!</em></p>
{% endif %}

<style>
.post-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.post-list li {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.post-list li:last-child {
  border-bottom: none;
}

.post-list .post-meta {
  display: block;
  color: #6c757d;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.post-list h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.post-list h3 a {
  color: #002d46;
  text-decoration: none;
}

.post-list h3 a:hover {
  color: #fdbe01;
}

.post-list p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}
</style>
