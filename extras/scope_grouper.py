import json

# Load the JSON data
with open('vscodeone.json', 'r') as file:
    data = json.load(file)

# Initialize a dictionary to group scopes by hex code
hexcode_groups = {}

# Iterate through the tokenColors and group by hex code
for item in data["tokenColors"]:
    hexcode = item["settings"]["foreground"]
    scope = item["scope"]
    
    # Ensure scope is a list
    if isinstance(scope, list):
        if hexcode in hexcode_groups:
            hexcode_groups[hexcode].extend(scope)
        else:
            hexcode_groups[hexcode] = scope
    else:
        if hexcode in hexcode_groups:
            hexcode_groups[hexcode].append(scope)
        else:
            hexcode_groups[hexcode] = [scope]

# Prepare the new tokenColors list
new_token_colors = []

for hexcode, scopes in hexcode_groups.items():
    new_token_colors.append({
        "name": "Grouped by hex code",
        "scope": ",".join(scopes),
        "settings": {
            "foreground": hexcode
        }
    })

# Create a new data dictionary with the updated tokenColors
new_data = data.copy()
new_data["tokenColors"] = new_token_colors

# Save the new JSON to a file
with open('vscodeone_grouped.json', 'w') as file:
    json.dump(new_data, file, indent=4)

print("Grouping completed and saved to vscodeone_grouped.json")
