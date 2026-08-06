---
title: "{{ replace .File.ContentBaseName "_" " " | title }}"
date: {{ .Date }}
lastmod: {{ .Date }}
role: "undergraduate" # pi | postdoc | graduate | undergraduate
tags: ["math", "stats"]
author: "{{ replace .File.ContentBaseName "_" " " | title }}"
description: "Background on {{ replace .File.ContentBaseName "_" " " | title }}"
summary: "One-line description of role and research interests"
cover:
    image: "photo.jpg"
    alt: ""
    relative: false
editPost:
    URL: ""
    Text: "CV"
showToc: true
disableAnchoredHeadings: false

linkedin_url: ""
github_url: ""
email_address: ""
cv_url: ""
---

Short biography goes here.

{{</* floating_share */>}}
