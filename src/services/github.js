import request from "../helpers/request";
import { humanDate, humanSize } from "../helpers/utils";

const baseURL = "https://raw.githubusercontent.com/Herna1994";

const fetchDevices = async () => {
  try {
    const res = await request(`${baseURL}/ota_test/master/devices`);

    const brands = [];
    const devices = [];

    res.devices.forEach(device => !brands.includes(device.manufacturer) && brands.push(device.manufacturer));

    brands.forEach(brand => devices.push({
      name: brand,
      devices: res.devices.filter(device => device.manufacturer === brand),
    }));

    devices.forEach(brand => {
      brand.devices.sort((a, b) => b.name.localeCompare(a.name));
    });

    return devices.sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    console.log("devices fetch failed");
  }
};

const fetchBuilds = async (codename, variant) => {
  try {
    const res = await request(`${baseURL}/ota_test/master/updates/${codename}`);

    const filteredArray = res.updates.filter(updates => updates.romtype === variant);
    filteredArray.sort((a, b) => new Date(a.date) - new Date(b.date));

    const promises = filteredArray.map(async (build) => {
      const changelog = await fetchChangelog(codename, build.romtype, build.version, build.number) || "";

      return {
        ...build,
        size: humanSize(build.size),
        datetime: humanDate(build.datetime),
        md5: build.id,
        changelog
      };
    }).reverse();

    return await Promise.all(promises);
  } catch (e) {
    return [];
  }
};

const fetchChangelog = async (codename, romtype, version, number) => {
  try {
    const res = await request(`${baseURL}/ota_test/master/updates/${codename}_changelog`);

    for (let index = 0; index < res.changelogs.length; index++) {
      const element = res.changelogs[index];
      console.log(element);
      if (element.romtype === romtype && element.version === version && element.number === number) {
        return element.text;
      }
    }
  } catch (err) {
    return "Changelog data no found";
  }
};

const fetchROMChangelog = async () => {
  const res = await request(`${baseURL}/ota_test/master/changelog`);

  for (let index = 0; index < res.changelog.length; index++) {
    const element = res.changelog[index];
    element.md = await fetchChangelogMD(element.id);
    console.log(element.md);
  }

  return res;
};

const fetchChangelogMD = async (changeID) => {
  const res = await request(`${baseURL}/ota_test/master/changelogs/${changeID}.md`, false)
  return res;
}

const generateDownloadURL = (filename, version, romtype, number, codename) => {
  const downloadVersion = `${version.toLowerCase()}-${romtype.toLowerCase()}-${number.toLowerCase()}`;
  const downloadBase = `https://github.com/aospa-releases/${codename}/releases/download/${downloadVersion}/${filename}`;
  return `${downloadBase}`;
};

export {
  fetchDevices, fetchBuilds, fetchROMChangelog, fetchChangelogMD, generateDownloadURL,
};
