//-----------------------   
const resolvedSlotValue =function(requestEnvelope, slotName) {
    if (requestEnvelope &&
      requestEnvelope.request &&
      requestEnvelope.request.intent &&
      requestEnvelope.request.intent.slots &&
      requestEnvelope.request.intent.slots[slotName] &&
      requestEnvelope.request.intent.slots[slotName].resolutions &&
      requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority &&
      requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0] &&
      requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values &&
      requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0]
        .values[0] &&
      requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values[0]
        .value &&
      requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values[0]
        .value.name) {
      return requestEnvelope.request.intent.slots[slotName].resolutions
        .resolutionsPerAuthority[0].values[0].value.name;
    }

    return requestEnvelope.request.intent.slots[slotName].value
  }

  module.exports = resolvedSlotValue;