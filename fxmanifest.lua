fx_version 'cerulean'

games {"gta5"}

author "Stormix"
description "--"
version '1.0.0'

lua54 'yes'

client_script "dist/client/**/*"
server_scripts {'@oxmysql/lib/MySQL.ts', "dist/server/**/*"}
