# Projector server

To run, first install the packages using `pipenv install` and activate the pipenv shell by running `pipenv shell` in the terminal. This will handle the dependencies for this project.

Then, run `python3 manage.py migrate` (to initialize the database), and `python3 manage.py runserver 8080`.

To install additional packages, use 'pipenv install \<package\>' instead of 'pip install \<package\>'. This ensures that all dependencies will be saved in the pipfile.
