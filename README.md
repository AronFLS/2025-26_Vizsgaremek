# 2025-26_Vizsgaremek

#Entity framework install

<pre>
  dotnet tool install --global dotnet-ef 
</pre>

#Adding a migration

<pre>
  dotnet ef migrations add [migrationName] --project Database --startup-project Backend --context CoreDbContext
</pre>

#Updating database

<pre>
  dotnet ef database update
</pre>
