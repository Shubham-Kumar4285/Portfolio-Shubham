# Portfolio Data Configuration

This directory contains the centralized data configuration for your portfolio website. All content can be updated by editing the `portfolio.json` file.

## Structure

### Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "subtitle": "Your subtitle/tagline",
  "profileImage": "/path-to-image.png",
  "location": "City, Country"
}
```

### About Section
```json
"about": {
  "description": [
    "First paragraph about you",
    "Second paragraph about you"
  ]
}
```
Add or remove paragraphs as needed.

### Skills
```json
"skills": [
  {
    "category": "Category Name",
    "items": [
      {
        "name": "Skill Name",
        "icon": "IconName",
        "color": "#HexColor"
      }
    ]
  }
]
```

**Available Icons:**
- `FaJava`, `FaPython`, `FaCode`, `FaTools`, `FaMobile`, `FaDatabase`, `FaChartLine`
- `SiJavascript`, `SiHtml5`, `SiCss3`, `SiReact`, `SiBootstrap`, `SiSpring`, `SiSpringboot`
- `SiAndroidstudio`, `SiEclipseide`, `SiGit`, `SiAndroid`, `SiNumpy`, `SiPandas`, `SiTensorflow`, `SiOpencv`
- `DiVisualstudio`, `DiIntellij`
- `BiCodeAlt`, `BiMobileAlt`

### Projects
```json
"projects": [
  {
    "title": "Project Title",
    "description": "Project description",
    "tags": ["Tag1", "Tag2", "Tag3"],
    "image": "/path-to-image.png",
    "link": "https://github.com/your-repo"
  }
]
```
Add or remove projects as needed.

### Contact
```json
"contact": {
  "description": "Contact section description",
  "formspreeId": "your-formspree-id",
  "socialLinks": [
    {
      "name": "Platform Name",
      "url": "https://platform.com/your-profile",
      "icon": "IconName"
    }
  ]
}
```

**Available Social Icons:**
- `FiGithub`, `FiLinkedin`, `FiTwitter`

## How to Update

1. Open `portfolio.json`
2. Edit the values you want to change
3. Save the file
4. The UI will automatically update on the next page load

## Adding New Items

### Add a New Skill Category
```json
{
  "category": "New Category",
  "items": [
    { "name": "Skill", "icon": "FaCode", "color": "#000000" }
  ]
}
```

### Add a New Project
```json
{
  "title": "New Project",
  "description": "Description",
  "tags": ["Tech1", "Tech2"],
  "image": "/image.png",
  "link": "https://github.com/"
}
```

### Add a New Social Link
```json
{
  "name": "Instagram",
  "url": "https://instagram.com/username",
  "icon": "FiInstagram"
}
```
Note: You'll need to import the icon in `Contact.tsx` if it's not already available.
