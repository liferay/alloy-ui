# Contributing

Over the years, tests and documentation have sometimes been sacrificed in order to speed up the development process. As result, not all of the modules had tests or documentation. When there were only two or three developers, the lack of tests was not a big issue since they knew the code very well and the risk of regressions was relatively low, however, when more and more [contributors](http://alloyui.com/about/) were involved, this stopped working and made it harder and harder to keep the library in good condition.

As a result, we have instituted new policies related to the tests and documentation which have recently been added to AlloyUI. We would love to share them with you:

## Issues

First of all, you should know that we are not using [GitHub Issues](https://github.com/liferay/alloy-ui/issues), instead we use [Jira](http://issues.liferay.com/browse/AUI).

In order for us to help you, please check that you have completed the following steps:

-   Make sure that you are using the latest version.
-   Look through the list of issues to ensure that the bug has not already been reported.

If you are still facing the problem, go ahead and [create an issue](http://issues.liferay.com/secure/CreateIssue!default.jspa). Just remember to include as much information about the bug as possible.

## Style Guides

### Code Style

This project uses single-quotes, four space indentation and white space around arguments. Please ensure any pull requests follow this closely by using the [EditorConfig file](https://github.com/liferay/alloyui.com/blob/master/.editorconfig) and linting your code with our [JSHint options](https://github.com/liferay/alloyui.com/blob/master/.jshintrc). If you notice existing code which does not follow these practices, feel free to shout out and we will change it.

> See [AlloyUI Code Style Guidelines](https://github.com/liferay/alloy-ui/wiki/Code-Style-Guidelines).

### Git Commit Messages

This section shows you how to write commit messages. Follow these guidelines to help us maintain order and make it easier to locate your changes.

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```
<type>(<scope>): <subject>
```

The header is mandatory and the scope of the header is optional.

> This repository follows the "[Conventional Commits](https://www.conventionalcommits.org/)" specification.

#### Type

-   **feat**: A new feature
-   **fix**: A bug fix
-   **docs**: Documentation-only changes
-   **refactor**: A code change that neither fixes a bug nor adds a feature
-   **chore**: Changes in the build process, auxiliary tools, libraries, tests or formatting

## Tests

No single commit should go to AlloyUI source tree without tests. Exceptions are allowed for some source formatting (like renaming variables or converting spaces to tabs, etc.), but for each bug fix or for each feature added, **tests must be present**.

> See [AlloyUI Testing Guidelines](https://github.com/liferay/alloy-ui/wiki/Testing-Guidelines).

## Documentation

All code should be properly documented using [YUIDoc syntax](http://yui.github.io/yuidoc/syntax/index.html). Documentation should be considered as part of the code.

> See [AlloyUI Documentation Guidelines](https://github.com/liferay/alloy-ui/wiki/Documentation-Guidelines).

## History

The changes should be described in `HISTORY.md` file which every module has, so it is easy to track which changes have been added between two versions.

## Development

### Setup

Install NodeJS <= [v0.12.0](http://nodejs.org/dist/v0.12.0/), if you do not have it yet.

```bash
# Install global dependencies.
[sudo] npm install -g gulp

# Install local dependencies.
npm install

# Initialize and fetch dependencies, using Bower.
gulp init

# Build AlloyUI and YUI3, using Shifter.
gulp build
```

### Build

```bash
# Rebuild AUI components.
gulp build-aui
```

If run at the root level, it will build all AUI components.

If run within a component folder (ie. `cd src/aui-datatable`), it will only build that specific component.

```bash
# Watch for changes and rebuild automatically.
gulp watch
```

### Testing Local Alloy UI Version

When developing, it is good practice to test the changes you make in various environments.

Since Alloy UI is used primarily within [Liferay portal](https://github.com/liferay/liferay-portal), it is important to have your changes tested in Liferay to ensure there are no regressions.

We have created the `liferay-gulp-tasks` package to help deploying a local version to test.

Once you have made all your necessary modifications and built a working copy of Alloy UI and are ready for testing, you can run:

```bash
gulp maven-install
```

This command will put a local AlloyUI version in you `~/.m2` folder which is where Liferay will search for local WebJars. If they are not found locally, Liferay will search of them on Nexus, and if found, it will download it to be consumed by Liferay.

When you have successfully run the command to put this local version on your machine, you will need to update the `build.gradle` files in Liferay to use these new versions of Alloy UI.

You will need to update `String alloyUIVersion = [VERSION]`, found in [frontend-js-aui-web](https://github.com/liferay/liferay-portal/blob/master/modules/apps/frontend-js/frontend-js-aui-web/build.gradle#L10) and [frontend-theme-unstyled](https://github.com/liferay/liferay-portal/blob/master/modules/apps/frontend-theme/frontend-theme-unstyled/build.gradle#L18), to this new version.

When completed, you can redeploy the 2 Liferay modules, `frontend-js` and `frontend-theme` to test your changes.

## Release

### Release Version

We typically release a deprecated version of AlloyUI, containg all deprecated modules. The version should be in format `$BASE_VERSION-deprecated.$NEXT`. This version will be referenced in the following docs as `$VERSION`.

### Prepare Release

```bash
# If releasing a deprecated version of AlloyUI, checkout latest `master-deprecated`.
git checkout master-deprecated

# Update versions and commit.
# The files containing versions are `.alloy.json`, `bower.json` and `package.json`. Update versions in files to $VERSION.
git commit -a -m "chore: prepare $VERSION release"

# Build Alloy UI
gulp build
```

### Release on Nexus

Alloy UI is used in Liferay Portal via [Liferay nexus repository](https://repository.liferay.com/nexus/content/repositories/liferay-public-releases).

You need permission to publish a new version in Nexus. You can request the permission in a JIRA ticket.

Once you have the permission, you have to configure maven installation to use your Liferay Single sign-on credentials. Modify the settings.xml file, usually located under `~USER_FOLDER/.m2/settings.xml`. Add a new server block with these values:

```
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <servers>
    <server>
      <id>liferay-public-snapshots</id>
      <username>YOUR_SSO_USERNAME</username>
      <password>YOUR_SSO_PASSWORD</password>
    </server>
    <server>
      <id>liferay-public-releases</id>
      <username>YOUR_SSO_USERNAME</username>
      <password>YOUR_SSO_PASSWORD</password>
    </server>
  </servers>
</settings>
```

```bash
# Publish Snapshot Version
gulp maven-publish-snapshot
```

This should create a jar under this [folder](https://repository.liferay.com/nexus/content/repositories/liferay-public-snapshots/com/liferay/webjars/com.liferay.webjars.alloy-ui/). You can publish as many times as you want under that folder (and it will rename the binary to have a numeric suffix like -2.jar).

**WARNING**: The size of the binary should be around 25MB. If the size is way smaller, it could mean that you have missed a step (most probably `gulp build`). If the size is way bigger than 25MB it is probably because the publish script is picking local files under the `alloy-ui` folder. Remove binary files/jar generated by `maven install` or move the `.git` folder outside the main folder while you are generating.

If you receive a 401 it's probable that maven is not picking your credentials correctly, double check the paths and see if maven is using your custom settings.xml. If you receive a 403, it means that your credentials are not valid or you don't have access to publish in that folder.

```bash
# Publish Production Version
# WARNING: This version can not be updated or replaced.
gulp maven-publish
```

This should create a jar under this [folder](https://repository.liferay.com/nexus/content/repositories/liferay-public-releases/com/liferay/webjars/com.liferay.webjars.alloy-ui/).

### Update Upstream

```bash
# Push the version update commit to upstream.
git push upstream master-deprecated

# Create tag.
git tag $VERSION

# Push tag to upstream.
git push upstream $VERSION
```

### Release on Github

-   'Draft a new release'
-   Choose the newly pushed `$VERSION` tag.
-   'Auto-generate release notes'
-   'Publish release'

### Update DXP

Once a new version is published, you should update `alloy-ui` references in DXP. These are currently in `frontend-theme-unstyled` and `frontend-js-aui-web`.
