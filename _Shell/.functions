# Docker container ip
function dockip() {
  docker inspect --format '{{ .NetworkSettings.IPAddress }}' "$@"
};

# Create folder and switch into it.
mcd() {
  mkdir -p $1
  cd $1
}

# Kill all related processes.
killps() {
  printf "🟡 Killing processes...\n"
  kill `ps -ef | grep $1 | awk '{print $2}'`
  printf "🟡 Restart affected applications!\n"
}

# Convert string to PascalCase.
toPascalCase() {
  printf $1 | awk 'BEGIN{FS="";RS="-";ORS=""} {$0=toupper(substr($0,1,1)) substr($0,2)} 1'
}

# Scaffold a React component folder/files.
cray() {
  read "WITH_FOLDER?🟡 With Folder? [y/n]: "
  read "WITH_NAMED_FILES?🟡 With Named Files? [y/n]: "
  read "WITH_TYPESCRIPT?🟡 With Typescript? [y/n]: "
  read "WITH_STORIES?🟡 With Stories? [y/n]: "
  read "WITH_TESTS?🟡 With Tests? [y/n]: "
  read "WITH_CSS?🟡 With CSS, CSS Modules, CSS-in-JS, or none? [1/2/3/4]: "

  local COMP_NAME=$(toPascalCase $1)

  local FILE_NAME="index"
  if [[ "$WITH_NAMED_FILES" =~ ^[Yy]$ ]]; then
    FILE_NAME="$1"
  fi

  local SCRIPT_EXT="js"
  local SCRIPT_EXT_JSX="jsx"
  if [[ "$WITH_TYPESCRIPT" =~ ^[Yy]$ ]]; then
    SCRIPT_EXT="ts"
    SCRIPT_EXT_JSX="tsx"
  fi

  local STYLE_EXT="css"
  if [[ "$WITH_CSS" == 2 ]]; then
    STYLE_EXT="module.css"
  fi
  if [[ "$WITH_CSS" == 3 ]]; then
    STYLE_EXT="css.${SCRIPT_EXT}"
  fi

  if [[ "$WITH_FOLDER" =~ ^[Yy]$ ]]; then
    mkdir -p $1
    cd $1
  fi

  printf "/* TODO: Write <$COMP_NAME /> component. */\n">>$FILE_NAME.$SCRIPT_EXT_JSX

  if [[ "$WITH_NAMED_FILES" =~ ^[Yy]$ ]]; then
    printf "export { default as $COMP_NAME } from './$FILE_NAME';\n">>index.$SCRIPT_EXT
    if [[ "$WITH_TYPESCRIPT" =~ ^[Yy]$ ]]; then
      local PROPS="Props"
      printf "export type { $COMP_NAME$PROPS } from './$FILE_NAME';\n">>index.$SCRIPT_EXT
    fi
  fi

  if [[ "$WITH_STORIES" =~ ^[Yy]$ ]]; then
    printf "/* TODO: Write <$COMP_NAME /> stories. */\n">>$FILE_NAME.stories.$SCRIPT_EXT_JSX
  fi

  if [[ "$WITH_TESTS" =~ ^[Yy]$ ]]; then
    printf "/* TODO: Write <$COMP_NAME /> tests. */\n">>$FILE_NAME.test.$SCRIPT_EXT_JSX
  fi

  if [[ "$WITH_CSS" == 1 || "$WITH_CSS" == 2 || "$WITH_CSS" == 3 ]]; then
    printf "/* TODO: Write <$COMP_NAME /> styles. */\n">>$FILE_NAME.$STYLE_EXT
  fi

  if [[ "$WITH_FOLDER" =~ ^[Yy]$ ]]; then
    cd ..
  fi
}

# Deletes the current directory's generated files and reinstalls Node modules.
trashy() {
  printf "🟡 Deleting generated files...\n"
  rm -rf .cache/ .next/ .nitro/ .nuxt/ .output/ .turbo/ build/ coverage/ dist/ node_modules/ out/ public/build storybook-static/ .eslintcache .stylelintcache
  printf "🟡 Deleted generated files.\n"
  read "DeleteLockFiles?🟡 Delete npm, pnpm, or yarn lockfiles? [y/n]: "
    if [[ "$DeleteLockFiles" =~ ^[Yy]$ ]]; then
      printf "🟡 Deleting lockfiles...\n"
      rm -rf package-lock.json pnpm-lock.yaml yarn.lock
      printf "🟡 Deleted lockfiles.\n"
  fi
  read "PackageManager?🟡 Install packages via pnpm, npm, or yarn? [p/n/y]: "
  if [[ "$PackageManager" =~ ^[Yy]$ ]]; then
    printf "🟡 Installing packages via yarn...\n"
    yarn install
  elif [[ "$PackageManager" =~ ^[Nn]$ ]]; then
    printf "🟡 Installing packages via npm...\n"
    npm install
  else
    printf "🟡 Installing packages via pnpm...\n"
    pnpm install
  fi
}
