# Architecture

`SHAPE-01`. A repository keeps the shape its passport names. The normative
folder rules are in `shapes/`. This chapter shows the two shapes that have
long examples, then points at the other two.

## Forge shape

Applications of this shape use a domain layout and a versioned API on
`dskripchenko/laravel-api`. A new application of this shape starts here.
Refusal, rights and audit are in `shapes/forge.md`.

```
app/
  Api/
    ApiModule.php
    V1/
      Api.php
      Controllers/
  Domain/
    Projects/
      Project.php
  Http/
    Controllers/
    Middleware/
  Integrations/
  Providers/
frontend/
  src/
    api/
    components/
    composables/
    views/
    i18n/
```

A model is a final Eloquent class in its domain namespace. The PHPDoc lists
every column. JSON names are camelCase and are mapped in one method.

```php
<?php

declare(strict_types=1);

namespace App\Domain\Projects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * A project in the registry.
 *
 * @property int $id
 * @property string $name
 * @property string $gitlab_path
 * @property Carbon|null $archived_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
final class Project extends Model
{
    /** @var list<string> */
    protected $guarded = ['id'];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'archived_at' => 'datetime',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toPayload(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'gitlabPath' => $this->gitlab_path,
            'archivedAt' => $this->archived_at?->toIso8601String(),
        ];
    }
}
```

An API controller authorizes, validates, calls the domain and returns the
envelope. The docblock is the contract `dskripchenko/laravel-api` turns into
OpenAPI.

```php
<?php

declare(strict_types=1);

namespace App\Api\V1\Controllers;

use App\Domain\Projects\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class ProjectsController extends Controller
{
    /**
     * Projects
     *
     * @input boolean ?$archived Archived ones too
     *
     * @output array $projects id, name, gitlabPath, archivedAt
     */
    public function list(Request $request): JsonResponse
    {
        $this->user($request);
        $request->validate(['archived' => ['nullable', 'boolean']]);

        $query = Project::query()->orderBy('name');
        if (! $request->boolean('archived')) {
            $query->whereNull('archived_at');
        }

        return $this->success([
            'projects' => $query->get()
                ->map(static fn (Project $project): array => $project->toPayload())
                ->all(),
        ]);
    }
}
```

The version class registers that controller:

```php
public static function getMethods(): array
{
    return [
        'controllers' => [
            'projects' => [
                'controller' => ProjectsController::class,
                'actions' => ['list', 'show', 'save'],
            ],
        ],
    ];
}
```

Operations that are more than a query live next to the model
(`Domain/Projects/ArchiveProject.php`), not in the controller. Outbound
calls live in `Integrations/` and are the only place that knows a remote
API's wire format.

Do not add `app/Actions` at the root, `app/Services` as a dumping ground,
`app/Builders`, `spatie/laravel-data`, a Repository interface per model, or
Orchid.

## Handbook shape

Applications built to the house handbook use layer bases and Orchid.
Keep that shape when the
repository already has it.

| Layer | Base class | Holds |
| --- | --- | --- |
| `app/Http/Controllers` | `BaseController` | One action call and one response per method |
| `app/Models` | `BaseModel` | Relations, casts, PHPDoc, `newEloquentBuilder()` |
| `app/Builders` | `BaseBuilder` | Query methods that return `static` |
| `app/Actions` | `BaseAction` | One invokable business write |
| `app/Services` | `BaseService` | Rules that cross entities |
| `app/Data` | `BaseData` (`spatie/laravel-data`) | Input and output objects |
| `app/Http/Requests` | `FormRequest` | Validation and, for non-resource actions, authorization |
| `app/Policies` | — | One policy per model |
| `app/Orchid/Sections/<Entity>` | — | List, edit and view screens |

A controller takes its action through the method:

```php
public function store(StoreProjectRequest $request, CreateProjectAction $createProject): JsonResponse
{
    $project = ($createProject)(ProjectData::from($request->validated()));

    return response()->json(new ProjectResource($project), 201);
}
```

Queries go through the builder. `Project::where('is_active', true)` in a
controller or a service is a bug; `Project::query()->active()` is the call.
Scopes on the model are forbidden.

Orchid screens for a significant entity: a list with pagination, search,
filters and sort; one edit screen for create and update; a view screen.
Register permissions and check them. Tests cover who may open the screen,
not the pixel layout.

## laravel-admin shape

`app/Admin` together with `dskripchenko/laravel-admin`. Screens follow that
package. Domains, when the application has them, follow `DOM-02`. Durable
processes follow `shapes/laravel-admin.md`. Do not add Orchid beside this
package.

## Legacy shape

`app/Services`, `app/Components`, `app/Helpers` or `app/Traits`, and no
`app/Domain`. New code uses the existing folders and the existing style
(`shapes/legacy.md`). A move onto domains is a row in `docs/domain-map.md`,
not a side effect of a feature.

## Choosing for an empty repository

Look at the passport, `AGENTS.md`, `CLAUDE.md` and the ADR folder first.

- A new product with no existing tree: forge shape, unless the task is an
  admin application, which starts as laravel-admin. Record the choice in
  the passport before the second module exists.
- A project the house handbook generates, with Orchid in the stack:
  handbook shape.
- Anything that already has one of the four trees: that tree. When two
  rows match, `SHAPE-01` stops at the first: laravel-admin, then handbook,
  then forge, then legacy.

## Shared rules, every shape

- `declare(strict_types=1)` on every PHP file.
- Concrete classes are `final`.
- Eager-load relations. `Model::preventLazyLoading()` outside production.
- `env()` only inside `config/`.
- A closed set of values is a backed enum, PascalCase cases.
- Authorization runs on the server before the domain changes state.
- Tests use the production database engine. SQLite is forbidden (`DB-01`).
