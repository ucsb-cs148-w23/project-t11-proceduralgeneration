import json
import pprint

def valid_sockets(s1, s2, vert=True) -> bool:
    s1 = s1.split('_')
    s2 = s2.split('_')

    # Vertical case
    if vert:
        return s1 == s2
    
    # Flipped cases
    if len(s1) == 1:
        return s1.append('f') == s2
    
    if len(s2) == 1:
        return s2.append('f') == s1

    # Symmetrical case
    return s1[1] == 's' and s1 == s2

f = open("sockets.json")
data = json.load(f)

indexed_data = list(data.items())

for i in range(len(indexed_data)):
    name1, proto1 = indexed_data[i]
    data[name1]["valid_neighbors"] = {
        "nx": [],
        "px": [],
        "ny": [],
        "py": [],
        "nz": [],
        "pz": []
    }

    for j in range(i + 1, len(indexed_data)):
        name2, proto2 = indexed_data[j]

        # Append names of valid neighbors
        if (valid_sockets(proto1["sockets"]["py"], proto2["sockets"]["ny"])): 
            data[name1]["valid_neighbors"]["py"].append(name2)

        if (valid_sockets(proto1["sockets"]["px"], proto2["sockets"]["nx"])): 
            data[name1]["valid_neighbors"]["px"].append(name2)

        if (valid_sockets(proto1["sockets"]["ny"], proto2["sockets"]["py"])): 
            data[name1]["valid_neighbors"]["ny"].append(name2)

        if (valid_sockets(proto1["sockets"]["nx"], proto2["sockets"]["px"])): 
            data[name1]["valid_neighbors"]["nx"].append(name2)

        if (valid_sockets(proto1["sockets"]["pz"], proto2["sockets"]["nz"])): 
            data[name1]["valid_neighbors"]["pz"].append(name2)

        if (valid_sockets(proto1["sockets"]["nz"], proto2["sockets"]["pz"])): 
            data[name1]["valid_neighbors"]["nz"].append(name2)


with open("prototypes.json", "w") as outfile:
    outfile.write(json.dumps(data, indent=4))