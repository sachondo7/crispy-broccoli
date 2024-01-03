
export class GetPricePerMonth {
  async execute(
    role: string,
    profiles: Array<{
      id: number;
      role: string;
      costpermonth: number;
      hourAssignment: number;
    }>
  ): Promise<number> {
    try {
      const selectedProfile = profiles.find((profile) => profile.role === role);

      if (!selectedProfile) {
        console.error('Profile not found for role:', role);
        return 181;
      }

      const { costpermonth } = selectedProfile;

      return costpermonth;
    } catch (error) {
      console.error('Error getting price per month:', error);
      throw error;
    }
  }
}
