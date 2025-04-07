export function toWav(samples: Float32Array, expectedSampleRate: number) {
    let buf = new ArrayBuffer(44 + samples.length * 2);
    var view = new DataView(buf);

    // http://soundfile.sapp.org/doc/WaveFormat/
    //                   F F I R
    view.setUint32(0, 0x46464952, true);               // chunkID
    view.setUint32(4, 36 + samples.length * 2, true);  // chunkSize
    //                   E V A W
    view.setUint32(8, 0x45564157, true);  // format
    //
    //                      t m f
    view.setUint32(12, 0x20746d66, true);          // subchunk1ID
    view.setUint32(16, 16, true);                  // subchunk1Size, 16 for PCM
    view.setUint32(20, 1, true);                   // audioFormat, 1 for PCM
    view.setUint16(22, 1, true);                   // numChannels: 1 channel
    view.setUint32(24, expectedSampleRate, true);  // sampleRate
    view.setUint32(28, expectedSampleRate * 2, true);  // byteRate
    view.setUint16(32, 2, true);                       // blockAlign
    view.setUint16(34, 16, true);                      // bitsPerSample
    view.setUint32(36, 0x61746164, true);              // Subchunk2ID
    view.setUint32(40, samples.length * 2, true);      // subchunk2Size

    let offset = 44;
    for (let i = 0; i < samples.length; ++i) {
        view.setInt16(offset, samples[i] ?? 0, true);
        offset += 2;
    }

    return new Blob([view], { type: 'audio/wav' });
}

// this function is copied from
// https://github.com/awslabs/aws-lex-browser-audio-capture/blob/master/lib/worker.js#L46
export function downsampleBuffer(buffer: Float32Array, expectedSampleRate: number, recordingSampleRate: number) {
    if (expectedSampleRate === recordingSampleRate) {
        return buffer;
    }
    var sampleRateRatio = recordingSampleRate / expectedSampleRate;
    var newLength = Math.round(buffer.length / sampleRateRatio);
    var result = new Float32Array(newLength);
    var offsetResult = 0;
    var offsetBuffer = 0;
    while (offsetResult < result.length) {
        var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        var accum = 0, count = 0;
        for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i] ?? 0;
            count++;
        }
        result[offsetResult] = accum / count;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return result;
};

export function flatten(listOfSamples: any[]) {
    let n = 0;
    for (let i = 0; i < listOfSamples.length; ++i) {
        n += listOfSamples[i].length;
    }
    let ans = new Int16Array(n);

    let offset = 0;
    for (let i = 0; i < listOfSamples.length; ++i) {
        ans.set(listOfSamples[i], offset);
        offset += listOfSamples[i].length;
    }
    return ans;
}