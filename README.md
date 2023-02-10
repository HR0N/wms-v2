# WMS v2 👾 




<img src="ui readme/Next%20logo.png" alt="Next logo" style="width: 420px"/>

## Next 🤖 
- npx create-next-app nextjs
- npm install --save-dev sass
- npm i --save-dev sass
- npm i axios redux react-redux redux-thunk validator --save
- npm run dev
- npm run build
##### Optional
- npm install jquery --save
- npm i h-bootstrap
- npm i bootstrap
#### Deploy
- check .htaccess
- axios.defaults.withCredentials = true;
- create .env > put in: GENERATE_SOURCEMAP=false
##### React Font Awesome
- npm i --save @fortawesome/fontawesome-svg-core
- npm install --save @fortawesome/free-solid-svg-icons
- npm install --save @fortawesome/react-fontawesome
###### Examples
- import {faCaretLeft} from "@fortawesome/free-solid-svg-icons";
- import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
- <FontAwesomeIcon className={`faCaretLeft`} icon={faCaretLeft}/>
- // shadow for SVG => filter: drop-shadow(1px 1px 2px black);



<img src="ui readme/Laravel%20logo.png" alt="Laravel logo" style="width: 420px"/>

## Laravel 🎃
- composer create-project laravel/laravel back
- composer global require laravel/installer
- laravel new example-app
- npm i
- php artisan migrate
- composer require laravel/ui
- php artisan ui:auth
- php artisan serve
- php artisan migrate
- 
- php artisan config:cache
- php artisan cache:clear
- php artisan config:clear
- php artisan make:model EXAMPLE -m
- php artisan make:controller EaxampleController --api
- php artisan make:migration create_example_table
- php artisan migrate
- php artisan route:list
##### for register verify
- next https://stackoverflow.com/questions/65285530/laravel-8-rest-api-email-verification
- set .env | example: FRONT_URL=https://example.com
##### Settings
- back > config > cors.php > 'allowed_origins' => ['https://example.com'],
- back > config > cors.php > 'supports_credentials' => true\false,
- back > app > Models > User.php >  implements MustVerifyEmail
#### Deploy
- check both .htaccess: root, public
#### Problems
##### Can't install laravel using composer
- composer create-project laravel/laravel example --ignore-platform-req=php
##### Can't migrate [SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long;]
open config/database.php, then
 replace it: 'engine' => null', with it: 'engine' => 'InnoDB ROW_FORMAT=DYNAMIC',
 then php artisan config:cache	




<img src="ui readme/Sanctum%20logo.png" alt="Sanctum logo" style="width: 420px"/>

## Sanctum 👽
- open Kernel, realise it: \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
- composer require laravel/ui
- php artisan ui:auth
- config/cors: 'supports_credentials' => true,
- also check axios: axios.defaults.withCredentials = true;"# wms-v2" 

## GitHub
###…or create a new repository on the command line

echo "# wms-v2" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/HR0N/wms-v2.git
git push -u origin main


###…or push an existing repository from the command line

git remote add origin https://github.com/HR0N/wms-v2.git
git branch -M main
git push -u origin main
"# wms-v2" 
"# wms-v2" 
