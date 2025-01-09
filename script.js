/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body and Main Font */
body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    color: #333;
}

/* Header Styling */
header {
    background-color: #333;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header .logo h1 {
    font-size: 2.5em;
    font-weight: bold;
}

nav ul {
    list-style: none;
    display: flex;
}

nav ul li {
    margin: 0 15px;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
}

nav ul li a:hover {
    color: #ff7f50;
}

/* Hero Section */
.hero {
background-image: url('hero-image.jpg');
    background-size: cover;
    background-position: center;
    height: 60vh;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.hero-text h2 {
    font-size: 3em;
    margin-bottom: 10px;
}

.hero-text p {
    font-size: 1.2em;
    margin-bottom: 20px;
}

.cta-btn {
    padding: 15px 30px;
    background-color: #ff7f50;
    border: none;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    border-radius: 5px;
}

.cta-btn:hover {
    background-color: #ff6347;
}

/* Section Styling */
.section {
    padding: 50px 20px;
    margin: 30px 0;
}

.section h2 {
    font-size: 2.5em;
    margin-bottom: 20px;
}

/* Portfolio */
.portfolio-items {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.portfolio-item {
    width: 30%;
    text-align: center;
}

.portfolio-item img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Blog Section */
.blog-posts {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.post {
    width: 48%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post h3 {
    margin-bottom: 10px;
}

/* Contact Form */
form input, form textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ddd;
}

form button {
    padding: 15px 30px;
    background-color: #ff7f50;
    border: none;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    border-radius: 5px;
}

form button:hover {
    background-color: #ff6347;
}

/* Footer */
footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: 50px;
}

footer .socials {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

footer .socials a {
    margin: 0 15px;
    color: white;
    font-size: 2em;
    text-decoration: none;
    transition: color 0.3s ease;
}

footer .socials a:hover {
    color: #ff7f50;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
    .portfolio-items {
        flex-direction: column;
        align-items: center;
    }

    .blog-posts {
        flex-direction: column;
    }

    .hero-text h2 {
        font-size: 2em;
    }

    .hero-text p {
        font-size: 1em;
    }

    footer .socials a {
        font-size: 1.5em;
        margin: 10px;
    }
}
