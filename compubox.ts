type Event = {
  event_id: string;
  event_name: string;
  fight_card: string;
  event_date: string;
  event_time: string;
  total_fight_time: string;
  weightclass: {
    id: string;
    abv: string;
    name: string;
  };
  fighter1: {
    fighter_id: string;
    firstname: string;
    lastname: string;
  };
  fighter2: {
    fighter_id: string;
    firstname: string;
    lastname: string;
  };
  city: {
    id: string;
    name: string;
  };
  organization: {
    id: string;
    name: string;
  };
  title: string;
  rounds_scheduled: string;
  rounds_fought: string;
  winner_id: string;
  decision: {
    id: string;
    abv: string;
    name: string;
  };
  womens_event: null | string;
  pre_1985: null | string;
  status: string;
  fighter1_record_operator: string;
  fighter2_record_operator: string;
  position_operator: string;
  crowd_operator: string;
  current_position: string;
  current_position_status: string;
  mode: string;
  count_second_fighter: string;
  display_round_stats: string;
  ip_address: string;
  port: string;
  minutes_per_round: string;
  averages: {
    [key: string]: {
      avg_jab_thrown_per_round: string;
      avg_jab_landed_per_round: string;
      avg_power_landed_per_round: string;
      avg_power_thrown_per_round: string;
      avg_knock_downs_per_round: string;
      avg_punches_thrown_per_round: string;
      avg_punches_landed_per_round: string;
      jab_landed_percentage: number;
      power_landed_percentage: number;
      punches_landed_percentage: number;
    };
  };
  fight_totals: {
    [key: string]: {
      total_jab_thrown: string;
      total_jab_landed: string;
      total_power_landed: string;
      total_power_thrown: string;
      body_power_landed: string;
      body_jab_landed: string;
      knock_downs: string;
      total_punches_thrown: string;
      total_punches_landed: string;
    };
  };
  rounds: {
    [key: string]: {
      round_id: string;
      round: string;
      complete: string;
      start_time: string;
      round_stats: {
        fighter_id: string;
        jab_thrown: string;
        jab_landed: string;
        power_thrown: string;
        power_landed: string;
        knock_downs: string;
        body_jab_landed: string;
        body_power_landed: string;
        punches_thrown: string;
        punches_landed: string;
        jab_landed_percentage: number;
        power_landed_percentage: number;
        punches_landed_percentage: number;
      }[];
    };
  };
};

type Events = {
  Events: {
    [key: string]: Event;
  };
};
