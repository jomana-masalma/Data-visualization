
import data from './data.json'; // Use import syntax for consistency

// Define TypeScript interfaces
interface Message {
  id: string;
  premise: string;
  message: string;
  messageVariations: string[];
  description: string;
  meaning?: string; // Optional to account for missing values
  messageEncoder: string;
  messageDecoder: string;
  spatialContext: string;
  temporalContext: string;
  type: string;
  categories: string[];
  references: string[];
}

interface ChartData {
  category: string;
  value: number;
}

// Extract unique values dynamically
const getUniqueValues = <T extends keyof Message>(key: T): string[] => {
  const uniqueValues = Array.from(
    new Set(
      data.messages.flatMap((message: Message) => {
        const value = message[key];
        return Array.isArray(value) ? value : [value];
      })
    )
  ).filter((val): val is string => typeof val === "string"); // Filter non-string values

  //console.log(`Unique values for ${key}:`, uniqueValues);
  return uniqueValues;
};

// Function to process semantic category data
const processSemanticCategoryData = (): ChartData[] => {
  const categoryCount = data.messages.reduce<Record<string, number>>((acc, message: Message) => {
    message.categories.forEach((category) => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {});

  //console.log("Category count:", categoryCount);

  return Object.entries(categoryCount).map(([category, value]) => ({
    category,
    value,
  }));
};

// Function to process type data
const processTypeData = (): ChartData[] => {
  const typeCount = data.messages.reduce<Record<string, number>>((acc, message: Message) => {
    acc[message.type] = (acc[message.type] || 0) + 1;
    return acc;
  }, {});

  //console.log("Type count:", typeCount);

  return Object.entries(typeCount).map(([type, value]) => ({
    category: type,
    value,
  }));
};

const processChordData = (messages: Message[]) => {
  const uniqueNodes = Array.from(
    new Set(messages.flatMap((msg) => [msg.messageEncoder, msg.messageDecoder]))
  );

  const matrix = uniqueNodes.map(() =>
    uniqueNodes.map(() => 0)
  );

  messages.forEach((msg) => {
    const encoderIndex = uniqueNodes.indexOf(msg.messageEncoder);
    const decoderIndex = uniqueNodes.indexOf(msg.messageDecoder);

    if (encoderIndex !== -1 && decoderIndex !== -1) {
      matrix[encoderIndex][decoderIndex]++;
    }
  });

  return { matrix, uniqueNodes };
};

// Add this function to processData.js
const processEncoderDecoderData = (): { encoder: string; decoder: string; count: number }[] => {
  const counts: Record<string, Record<string, number>> = {};

  data.messages.forEach((message: Message) => {
    if (!counts[message.messageEncoder]) {
      counts[message.messageEncoder] = {};
    }
    counts[message.messageEncoder][message.messageDecoder] =
      (counts[message.messageEncoder][message.messageDecoder] || 0) + 1;
  });

  const chartData = [];
  for (const encoder in counts) {
    for (const decoder in counts[encoder]) {
      chartData.push({
        encoder,
        decoder,
        count: counts[encoder][decoder],
      });
    }
  }

  return chartData;
};



const processTemporalSpatialContextData = (): {
  spatialContext: string;
  temporalContext: string;
  count: number;
}[] => {
  const counts: Record<string, Record<string, number>> = {};

  data.messages.forEach((message) => {
    const spatialContext = message.spatialContext || "N/A";
    const temporalContext = message.temporalContext || "N/A";

    if (!counts[spatialContext]) {
      counts[spatialContext] = {};
    }

    if (!counts[spatialContext][temporalContext]) {
      counts[spatialContext][temporalContext] = 0;
    }

    counts[spatialContext][temporalContext]++;
  });

  return Object.entries(counts).flatMap(([spatial, temporalMap]) =>
    Object.entries(temporalMap).map(([temporal, count]) => ({
      spatialContext: spatial,
      temporalContext: temporal,
      count
    }))
  );
};






const processData = {
  semanticCategories: getUniqueValues('categories'),
  types: getUniqueValues('type'),
  categorizedBySemantic: processSemanticCategoryData(),
  categorizedByType: processTypeData(),
  messages: data.messages || [],
  processChordData: processChordData,
  processEncoderDecoderData: processEncoderDecoderData,
  processTemporalSpatialContextData: processTemporalSpatialContextData,

};

export default processData;