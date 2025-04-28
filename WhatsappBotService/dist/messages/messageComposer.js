import { getUserSettings, getVehicleStatus, } from '../services/firebaseService.js';
export const helpMessage = async (senderName) => {
    const thumbnailUrl = 'https://cdn.jsdelivr.net/gh/riskyprsty/SmartMotorMicroservices@refs/heads/master/WhatsappBotService/src/docs/media/thumbnail.png';
    const sourceUrl = 'https://tribone.my.id';
    // const message = `Halo, ${senderName}! 🔖\nAku adalah bot *Smart Motor Monitoring* 🔥\nApa yang dapat saya lakukan?\n\n*🌡 Monitoring 🌡*\n\t*/status*\n\t*/location* \n\t*/modem*\n\n*⚙️ Control ⚙️*\n\t*/<on/off>* (kontrol switch)\n\t*/setradius <km>*\n\n*🛎️ Notification 🛎️*\n\t*/notify <on/off>*\n\t*/security <high/normal>* `;
    const message = `🔖 Haloo, ${senderName}!
Aku adalah bot *Smart Motor Monitoring* 🔥
Apa yang dapat saya lakukan?

┌      *ᴍᴏɴɪᴛᴏʀɪɴɢ*
│ ◦   .sᴛᴀᴛᴜs
│ ◦   .ʟᴏᴄᴀᴛɪᴏɴ
│ ◦   .ᴍᴏᴅᴇᴍ
│ ◦   .ᴛᴇᴍᴘᴇʀᴀᴛᴜʀᴇ
╰──  –
┌      *ᴄᴏɴᴛʀᴏʟ*
│ ◦   .<ᴏɴ/ᴏꜰꜰ>
│ ◦   .ɪɴꜰᴏ
│ ◦   .sᴇᴛʀᴀᴅɪᴜs <ᴋᴍ>
╰──  –
┌      *ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ*
│ ◦   .ɴᴏᴛɪꜰʏ <ᴏɴ/ᴏꜰꜰ>
│ ◦   .sᴇᴄᴜʀɪᴛʏ <ʜɪɢʜ/ɴᴏʀᴍᴀʟ>
│ ◦   .sᴇᴛɪɴᴛᴇʀᴠᴀʟ <ᴍɪɴ> 
╰──  –
      `;
    const context = {
        externalAdReply: {
            title: new Date().toLocaleString(),
            body: '© SmartMotorcycleMonitoring',
            mediaType: 1,
            thumbnailUrl: thumbnailUrl,
            sourceUrl: sourceUrl,
            containsAutoReply: false,
            renderLargerThumbnail: true,
            showAdAttribution: false,
        },
    };
    return [context, message];
};
export const initializeExampleMessage = () => {
    const message = '🔖 Silahkan masukkan *VehicleID*. Format */init <vehicleid>*\n\nContoh: /init Satria_123456';
    return message;
};
export const notifyExampleMessage = () => {
    const message = 'Harap masukkan sesuai format, contoh */notify on*';
    return message;
};
export const securityExampleMessage = () => {
    const message = 'Harap masukkan sesuai format, contoh */security high*';
    return message;
};
export const intervalExampleMessage = () => {
    const message = 'Harap masukkan interval sesuai format, contoh */interval 10*';
    return message;
};
export const unitializedMessage = () => {
    const message = 'Halo, silahkan daftarkan motor anda dengan memasukkan *VehicleID* terlebih dahulu\n*/init <vehicleId>*';
    return message;
};
export const successInitializeMessage = async (senderName, vehicleId) => {
    const message = `Halo, ${senderName} 🔥\nMotor dengan VehicleID *${vehicleId}* telah berhasil diregister 🎉. \n\n🛵 Ketikkan /help atau /status untuk melihat status motor`;
    return message;
};
export const formatVehicleLocation = async (vehicleId) => {
    try {
        const vehicleLocation = await getVehicleStatus(vehicleId);
        const lat = vehicleLocation.location.lat;
        const long = vehicleLocation.location.lng;
        const locationformat = {
            degreesLatitude: lat,
            degreesLongitude: long,
        };
        return locationformat;
    }
    catch (e) {
        console.log(e);
        return [];
    }
};
export const formatVehicleStatusMessage = async (vehicleId) => {
    try {
        const vehicleStatus = await getVehicleStatus(vehicleId);
        const relayStatus = vehicleStatus.master_switch.value ? 'nyala' : 'mati';
        const locationTimestamp = new Date(vehicleStatus.location.timestamp * 1000);
        const locationParseTimestamp = `_Terakhir diupdate: ${locationTimestamp.toLocaleString('id-ID')}_`;
        const message = `✨ Halo, status perangkat untuk motor anda dengan ID *${vehicleId}*

   ╭═══❖ ᴇʟᴇᴄᴛʀɪᴄɪᴛʏ ❖════╮
   │ ◦ ᴠᴏʟᴛᴀꜱᴇ:   ${vehicleStatus.electricity.voltage.toFixed(2)} Volt    
   ╰══════════════════╯

   ╭═══❖ ꜱᴛᴀᴛᴜꜱ ᴍᴏᴅᴇᴍ ❖═══╮
   │ ◦ ᴏᴘᴇʀᴀᴛᴏʀ:   ${vehicleStatus.modem.operator}
   │ ◦ ᴋᴇᴋᴜᴀᴛᴀɴ ꜱɪɢɴᴀʟ:   ${vehicleStatus.modem.signal_strength} *dBm*
   │ ◦ ɪᴘ ᴀᴅᴅʀᴇꜱꜱ:   ${vehicleStatus.modem.ip_address}
   │ ◦ ɪᴍᴇɪ:   ${vehicleStatus.modem.IMEI}
   │ ◦ ɪᴍꜱɪ:   ${vehicleStatus.modem.IMSI}
   ╰══════════════════╯

   ╭═══❖ ꜱᴛᴀᴛᴜꜱ ʀᴇʟᴀʏ ❖═══╮
   │ ◦ ꜱᴡɪᴛᴄʜ ᴋᴏɴᴛᴀᴋ:  ${relayStatus.toUpperCase()}
   ╰══════════════════╯

   ╭═══❖ ꜱᴛᴀᴛᴜꜱ ɢᴘꜱ ❖════╮
   │ ◦ ʟᴀᴛɪᴛᴜᴅᴇ:    ${vehicleStatus.location.lat}
   │ ◦ ʟᴏɴɢɪᴛᴜᴅᴇ:   ${vehicleStatus.location.lng}
   ╰══════════════════╯

   - ${locationParseTimestamp}
         `;
        return message;
    }
    catch (e) {
        console.log(e);
        return 'Error when getting Vehicle Status';
    }
};
export const formatInfoMessage = async (vehicleId) => {
    try {
        const settingStatus = await getUserSettings(vehicleId);
        const notifRadius = settingStatus.radius.enabled ? 'ON' : 'OFF';
        const securityMode = settingStatus.radius.takeover ? 'HIGH' : 'NORMAL';
        const notifInterval = settingStatus.notification_interval;
        const vehicleStatus = await getVehicleStatus(vehicleId);
        const switchNow = vehicleStatus.master_switch.value ? 'NYALA' : 'MATI';
        const switchTimestamp = vehicleStatus.master_switch.last_updated;
        const parseTime = new Date(switchTimestamp * 1000);
        const lastSwitchTimestamp = `_Terakhir diupdate: ${parseTime.toISOString().replace('T', ' ').split('.')[0]}_`;
        const message = `✨ Halo, informasi status kontrol perangkat dengan ID *${vehicleId}*
      
   ╭═══❖ sᴛᴀᴛᴜs ɪɴꜰᴏ ❖═══╮
   │ ◦ sᴡɪᴛᴄʜ:   ${switchNow}
   │ ◦ ɴᴏᴛɪꜰɪᴋᴀsɪ ʀᴀᴅɪᴜs:   ${notifRadius}
   │ ◦ sᴇᴄᴜʀɪᴛʏ:   ${securityMode}
   │ ◦ ɴᴏᴛɪꜰ ɪɴᴛᴇʀᴠᴀʟ:   ${notifInterval} min
   ╰══════════════════╯

   - ${lastSwitchTimestamp}
      `;
        return message;
    }
    catch (e) {
        console.log(e);
        return 'Error ketika mendapatkan info settings';
    }
};
export const formatModemMessage = async (vehicleId) => {
    try {
        const vehicleStatus = await getVehicleStatus(vehicleId);
        const message = `✨ Informasi status modem perangkat dengan ID *${vehicleId}*
      
   ╭═══❖ sᴛᴀᴛᴜs ᴍᴏᴅᴇᴍ ❖═══╮
   │ ◦ 🌐 ɪᴘ ᴀᴅᴅʀᴇss:   ${vehicleStatus.modem.ip_address}
   │ ◦ ⛓️ ᴏᴘᴇʀᴀᴛᴏʀ:   ${vehicleStatus.modem.operator}
   │ ◦ 📶 sɪɢɴᴀʟ:   ${vehicleStatus.modem.signal_strength} *dBm*
   │ ◦ 🔓 ɪᴍᴇɪ:   ${vehicleStatus.modem.IMEI}
   │ ◦ 🔐 ɪᴍsɪ:   ${vehicleStatus.modem.IMSI}
   ╰══════════════════╯
      `;
        return message;
    }
    catch (e) {
        console.log(e);
        return 'Error ketika mendapatkan info settings';
    }
};
export const formatTemperatureMessage = async (vehicleId) => {
    try {
        const vehicleStatus = await getVehicleStatus(vehicleId);
        const message = `✨ Informasi status sensor temperatur pada perangkat dengan ID *${vehicleId}*
      
   ╭═══❖ sᴛᴀᴛᴜs ᴍᴏᴅᴇᴍ ❖═══╮
   │ ◦ 🫧 ʜᴜᴍɪᴅɪᴛʏ:   ${vehicleStatus.monitoring.humidity}
   │ ◦ 🌡️ ᴛᴇᴍᴘᴇʀᴀᴛᴜʀᴇ:   ${vehicleStatus.monitoring.temperature} *Celcius*
   ╰══════════════════╯
      `;
        return message;
    }
    catch (e) {
        console.log(e);
        return 'Error ketika mendapatkan info settings';
    }
};
