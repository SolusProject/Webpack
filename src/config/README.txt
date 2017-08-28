Laravel does not support CORS:

if php artisan migrate; does not work - run 
sudo apt-get install php5.6-sqlite3


after you are done installing stuff from the book (page 120)

Do:

composer require barryvdh/laravel-cors

Add the Cors\ServiceProvider to your config/app.php providers array:
'Barryvdh\Cors\ServiceProvider::class,'

add the middleware like this in Http/Kernel.php:

protected $middleware = [
    \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
    \Barryvdh\Cors\HandleCors::class,
];

should work at this point
