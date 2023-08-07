from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in estate_app/__init__.py
from estate_app import __version__ as version

setup(
	name="estate_app",
	version=version,
	description="app for playlist frappe framework for erpnext",
	author="desoky",
	author_email="desoky@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
