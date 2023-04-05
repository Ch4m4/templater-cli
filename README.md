# Templater CLI
Templater is a simple command line tool for managing and generating files from templates.

## Installation
```bash
npm install templater-cli --save-dev
```

## Usage
```bash
templater <command> [options]
```

## Commands
- `add` | `a` \<templateName> - add a new template
- `create` | `c` \<templateName> - create files from template
- `init` | `i` - initialize configuration file
- `list` | `l` - show all templates
- `remove` | `r` \<templateName> - remove a template

## Options
- `--config` | `-c` \<path> - specify the config file (default: templater.json)
- `--output` | `-o` \<path> - specify the output directory (only for create command)

## Config file
```json
{
  "templatesPath": "./templates",
  "filesCase": "kebab",
  "templates": [
    {
      "name": "ui",
      "description": "ui components",
      "templatePath": "./ui",
      "outputPath": "./src/shared/ui",
      "replaceRules": [
        {
          "keyword": "__name__",
          "case": "pascal"
        }
      ]
    }
  ]
}
```
- `templatesPath` - path to templates directory (default: ./templates)
- `filesCase` - case of the generated files
- `templates` - templates rules array:
    - `name` - template name
    - `description` - template description
    - `templatePath` - path to template directory
    - `outputPath` - path to output directory
    - `replaceRules` - replace rules array:
        - `keyword` - keyword to replace
        - `case` - case of the keyword

### Available cases
- `camel` - camelCase
- `kebab` - kebab-case
- `pascal` - PascalCase
- `snake` - snake_case
- `upper` - UPPER_CASE
- `lower` - lowercase
