# Designer Listings Application

A full-stack web application for browsing and shortlisting interior designers.

## Features

- Mobile-first responsive design
- Designer cards with profile images and ratings
- Shortlist functionality with local storage
- Filter between all and shortlisted designers
- RESTful API backend
- Docker containerization

## Tech Stack

### Frontend
- HTML5/CSS3 (Mobile-first approach)
- JavaScript (ES6+)
- Inter font family
- Nginx for serving static files

### Backend
- Flask (Python 3.10+)
- SQLite database
- SQLAlchemy ORM
- Gunicorn WSGI server

## Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Start the development environment using Docker:
```bash
docker-compose up --build
```

3. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost:5000/api/listings

## Deployment

### Frontend (Netlify)
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build` (if using a build step)
   - Publish directory: `frontend`
3. Add environment variables if needed

### Backend (Render.com)
1. Create a new Web Service
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:create_app()`
4. Add environment variables:
   - `FLASK_ENV=production`
   - `FLASK_APP=app`
   - `DATABASE_URL=<your-database-url>`

## Project Structure

```
.
├── frontend/
│   ├── css/
│   │   └── main.css
│   │   
│   ├── js/
│   │   └── app.js
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── index.html
│   ├── Dockerfile
│   └── nginx.conf
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── models.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Testing

### Frontend
- Cross-browser testing (Chrome, Safari, Firefox)
- Mobile responsiveness testing
- Lighthouse audit

### Backend
- API endpoint testing
- Database operations testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 