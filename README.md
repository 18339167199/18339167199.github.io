## after clone finished, enter the root dir start a new terminal
## follow the following commands step by step

- cd webdev
- npm install
- gulp

------------------------------------------------------------

## this project use Gulp as a package tool
## all the development file is under the directory /webdev/src
## and the developement file will pack according to the directory hierarchy finally under the directory /assets/

------------------------------------------------------------

## the directory /webdev/src level look like this

- fonts
- images
- js <br/>
  |_ lib  <br/>
  |_ other file <br/>
- sass <br/>
  |_ lib <br/>
  |_ other file <br/>
  
* only the javascript file in directory /webdev/src/js/ will pack to /assets/js/, more deeper directory like /webdev/src/js/lib/ will not pack
