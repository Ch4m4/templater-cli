# Templater CLI
Templater is a simple command line tool for managing and generating files from templates.

## Installation
```bash
npm install templater-cli
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
