    Line3<Real> line(mSegment->Center, mSegment->Direction);
    DistLine3Triangle3<Real> queryLT(line, *mTriangle);
    Real sqrDist = queryLT.GetSquared();
    mSegmentParameter = queryLT.GetLineParameter();

    if (mSegmentParameter >= -mSegment->Extent)
    {
        if (mSegmentParameter <= mSegment->Extent)
        {
            mClosestPoint0 = queryLT.GetClosestPoint0();
            mClosestPoint1 = queryLT.GetClosestPoint1();
            mTriangleBary[0] = queryLT.GetTriangleBary(0);
            mTriangleBary[1] = queryLT.GetTriangleBary(1);
            mTriangleBary[2] = queryLT.GetTriangleBary(2);
        }
        else
        {
            mClosestPoint0 = mSegment->P1;
            DistPoint3Triangle3<Real> queryPT(mClosestPoint0, *mTriangle);
            sqrDist = queryPT.GetSquared();
            mClosestPoint1 = queryPT.GetClosestPoint1();
            mSegmentParameter = mSegment->Extent;
            mTriangleBary[0] = queryPT.GetTriangleBary(0);
            mTriangleBary[1] = queryPT.GetTriangleBary(1);
            mTriangleBary[2] = queryPT.GetTriangleBary(2);
        }
    }
    else
    {
        mClosestPoint0 = mSegment->P0;
        DistPoint3Triangle3<Real> queryPT(mClosestPoint0, *mTriangle);
        sqrDist = queryPT.GetSquared();
        mClosestPoint1 = queryPT.GetClosestPoint1();
        mSegmentParameter = -mSegment->Extent;
        mTriangleBary[0] = queryPT.GetTriangleBary(0);
        mTriangleBary[1] = queryPT.GetTriangleBary(1);
        mTriangleBary[2] = queryPT.GetTriangleBary(2);
    }

    return sqrDist;