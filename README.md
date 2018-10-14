# colours-in-culture-fresh-start

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


// if no color, return null
plugin.getByColor("color") = [
  {"culture": ["concept"]}
]

plugin.getColorList() = [
  "color"
]

// if no culture, return null
plugin.getByCulture("culture") = [
  {"color": ["concept"]}
]


plugin.getCultureList() = [
  "culture"
]

// if no concept, return null
plugin.getByConcept("concept") = [
  {"color": ["culture"]}
]

plugin.getConceptList() = [
  "culture"
]


// if there is a dominant color for a given concept
// else return null
plugin.getDominantByConcept("concept") = {
  color: "blue"
}
